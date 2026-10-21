
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkAuthStatus, cleanStorage, setAuthModel, getAuthModel, setToken, getPlanEstudioSelectedStorage, setPlanEstudioSelectedStorage } from '../hooks/useLocalStorage';
import { encryptData } from '../utils/crypto';
import type { User } from '@constants';
import type { PlanEstudioSeleccionado } from '../types/PlanesEstudio.interface';
import { authLogin, authNewPassword, authLogout } from '../services/AuthService';
// useGetPerfilUsuario,

interface AuthContextType {
  user: User | null;
  isLoading?: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitializing: boolean;
  isTokenExpired: boolean;
  isLogout: boolean;
  /** Espacio de trabajo activo. Única fuente de verdad para empresa + plan. */
  planEstudioSelected?: PlanEstudioSeleccionado;
  /** Derivado de planEstudioSelected, por comodidad de los componentes de layout. */
  empresaSelected?: {id_empresa: number, nombre_empresa: string, badgeText: string};
  clearError: () => void;
  login: (usuario: string, password: string) => Promise<{ success: boolean; message?: string; cambiarPassword?: boolean; aceptoTerminos?: boolean }>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  newPassword: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  /** Actualiza estado y storage en un solo lugar. */
  setPlanEstudioSelected?: (plan: PlanEstudioSeleccionado) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [planEstudioSelected, setPlanEstudioSelected] = useState<PlanEstudioSeleccionado | undefined>(() => getPlanEstudioSelectedStorage());

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLogout, setIsLogout] = useState(false);

    // const { refetch } = useGetPerfilUsuario("Login", { enabled: false });
    
    const queryClient = useQueryClient();

    // Verificar autenticación al montar el componente
    useEffect(() => {
        const checkAuth = async () => {
            setIsInitializing(true);

            try {
                const { isAuth, tokenExpired } = await checkAuthStatus();
                setIsAuthenticated(isAuth);
                setIsTokenExpired(tokenExpired);
                if (isAuth && !tokenExpired) {
                    const userData = await getAuthModel();
                    setUser(userData);

                    // Restaura el espacio de trabajo persistido (si existe)
                    setPlanEstudioSelected(getPlanEstudioSelectedStorage());
                }
            } catch (error) {
                console.error("Error checking auth:", error);
            }
            setIsLoading(false);
            setIsInitializing(false);
        };

        checkAuth();
    }, []);

    const loginMutation = useMutation({
        mutationFn: authLogin,
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    });

    const newPasswordMutation = useMutation({
        mutationFn: authNewPassword,
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    });

    const handleLogin = async(usuario: string, password: string) => {
        try {
            initValues();
            
            const response = await loginMutation.mutateAsync({ password, usuario });
            
            queryClient.invalidateQueries({ queryKey: ['currentUser']});

            // if(response?.session) {
            //     localStorage.setItem("session", response.session);
            //     return { success: false, data: null, cambiarPassword: true };
            // }

            if (response?.accessToken) {
                setToken(response?.accessToken);
                
                await procesarPerfil(response?.user);

                setIsAuthenticated(true);                
                setIsLoading(false);
                
                return { success: true, data: null, cambiarPassword: false };
            } else {
                setIsLoading(false);
                // const errorMessage = response?.message || 'Autenticación fallida';
                const errorMessage = 'Autenticación fallida';
                setError(errorMessage);
                return { success: false, message: errorMessage, cambiarPassword: false };
            }
        } catch (error: any) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Error al conectar con el servidor';
            setError(errorMessage);
            return { success: false, message: errorMessage, cambiarPassword: false };
        }
    }

    const handleNewPassword = async(usuario: string, password: string) => {
        try {
            initValues();

            const username = usuario;
            const token = localStorage.getItem("session") || "";
            const response = await newPasswordMutation.mutateAsync({ newPassword: password, username, token });
            
            localStorage.removeItem("session");

            queryClient.invalidateQueries({ queryKey: ['currentUser']});

            if (response?.accessToken) {
                setToken(response?.accessToken);

                await procesarPerfil(response?.user);
                
                setIsAuthenticated(true);
                setIsLoading(false);
                
                return { success: true, data: null };
            } else {
                setIsLoading(false);
                // const errorMessage = response?.message || 'Autenticación fallida';
                const errorMessage = 'Autenticación fallida';
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error: any) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Error al conectar con el servidor';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    }

    const procesarPerfil = async(user: User) => {
        if (user) {
            setUser(user);
            const encry = await encryptData(user);
            setAuthModel(encry);
        } else {
            setUser(null);
        }
    };

    const logoutMutation = useMutation({
        mutationFn: authLogout,
        onSuccess: () => {
            cleanStorage();
            setUser(null);
            setPlanEstudioSelected(undefined);
            setIsLogout(true);
            setIsAuthenticated(false);
            setIsTokenExpired(false);
            queryClient.clear();
        }
    });

    const handleLogout = async () => {
        setIsLogout(true);
        setIsAuthenticated(false);
        setIsTokenExpired(false);
        await logoutMutation.mutate();
    };

    const clearError = () => {
        setError(null);
    };

    const initValues = () => {
        setUser(null);
        setIsLoading(true);
        setIsAuthenticated(false);
        setError(null);
        setIsTokenExpired(false);   
        setIsLogout(false);
    }

    /**
     * Único setter del espacio de trabajo: actualiza el estado del contexto
     * y persiste en storage en el mismo lugar.
     */
    const handleSetPlanEstudioSelected = (plan: PlanEstudioSeleccionado): void => {
        setPlanEstudioSelectedStorage(plan);
        setPlanEstudioSelected(plan);
    };

    // La empresa activa es un derivado del espacio de trabajo seleccionado
    const empresaSelected = planEstudioSelected
        ? {
            id_empresa: planEstudioSelected.id_empresa,
            nombre_empresa: planEstudioSelected.nombre_empresa,
            badgeText: planEstudioSelected.badgeText,
        }
        : undefined;

    const value = {
        user,
        isLoading,
        isAuthenticated,
        error,
        isInitializing,
        isTokenExpired,
        isLogout,
        planEstudioSelected,
        empresaSelected,
        setPlanEstudioSelected: handleSetPlanEstudioSelected,
        login: handleLogin,
        logout: handleLogout,
        clearError,
        setUser,
        newPassword: handleNewPassword,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};