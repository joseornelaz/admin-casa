import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkAuthStatus, cleanStorage, setToken } from '../hooks/useLocalStorage'; //setAuthModel, getAuthModel,
// import { encryptData } from '../utils/crypto';
import { AppRoutingPaths, type User } from '@constants';
import { useAuthLogin, useAuthNewPassword, useLogout } from '../services/AuthService';
import { apiClient } from '../services/ApiConfiguration/httpClient';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// useGetPerfilUsuario,

interface AuthContextType {
  user: User | null;
  isLoading?: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitializing: boolean;
  isTokenExpired: boolean;
  isLogout: boolean;
  clearError: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; cambiarPassword?: boolean; aceptoTerminos?: boolean }>;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  newPassword: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_EXPIRED_MODAL_KEY = 'sessionExpiredModalPending';
const SESSION_EXPIRED_MESSAGE_KEY = 'sessionExpiredModalMessage';
const SESSION_EXPIRED_DEFAULT_MESSAGE = 'Inicio de sesión expirado.';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLogout, setIsLogout] = useState(false);
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(() => localStorage.getItem(SESSION_EXPIRED_MODAL_KEY) === 'true');
    const [sessionExpiredMessage, setSessionExpiredMessage] = useState(() => localStorage.getItem(SESSION_EXPIRED_MESSAGE_KEY) || SESSION_EXPIRED_DEFAULT_MESSAGE);
    const unauthorizedHandledRef = useRef(false);

    // const { refetch } = useGetPerfilUsuario("Login", { enabled: false });
    
    const queryClient = useQueryClient();

    const setSessionExpiredModalState = useCallback((message?: string) => {
        const modalMessage = message || SESSION_EXPIRED_DEFAULT_MESSAGE;
        localStorage.setItem(SESSION_EXPIRED_MODAL_KEY, 'true');
        localStorage.setItem(SESSION_EXPIRED_MESSAGE_KEY, modalMessage);
        setSessionExpiredMessage(modalMessage);
        setShowSessionExpiredModal(true);
    }, []);

    const clearSessionExpiredModalState = useCallback(() => {
        localStorage.removeItem(SESSION_EXPIRED_MODAL_KEY);
        localStorage.removeItem(SESSION_EXPIRED_MESSAGE_KEY);
        setSessionExpiredMessage(SESSION_EXPIRED_DEFAULT_MESSAGE);
        setShowSessionExpiredModal(false);
    }, []);

    const handleUnauthorizedSession = useCallback((message?: string) => {
        if (unauthorizedHandledRef.current) return;
        unauthorizedHandledRef.current = true;

        setSessionExpiredModalState(message);
        cleanStorage();
        setUser(null);
        setIsLogout(true);
        setIsAuthenticated(false);
        setIsTokenExpired(true);
        setIsLoading(false);
        setError(message || SESSION_EXPIRED_DEFAULT_MESSAGE);

        queryClient.clear();
        window.location.hash = AppRoutingPaths.RAIZ;
    }, [queryClient, setSessionExpiredModalState]);

    // Verificar autenticación al montar el componente
    useEffect(() => {
        const checkAuth = async () => {
            setIsInitializing(true);

            try {
                const { isAuth, tokenExpired } = await checkAuthStatus();
                setIsAuthenticated(isAuth);
                setIsTokenExpired(tokenExpired);
                // if (isAuth && !tokenExpired) {
                //     const userData = await getAuthModel();
                //     setUser(userData);
                // }
            } catch (error) {
                console.error("Error checking auth:", error);
            }
            setIsLoading(false);
            setIsInitializing(false);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (localStorage.getItem(SESSION_EXPIRED_MODAL_KEY) !== 'true') return;

        cleanStorage();
        setUser(null);
        setIsAuthenticated(false);
        setIsTokenExpired(true);
        setIsLoading(false);
        queryClient.clear();
        window.location.hash = AppRoutingPaths.RAIZ;
    }, [queryClient]);

    useEffect(() => {
        const unsubscribe = apiClient.subscribeUnauthorized((message) => {
            handleUnauthorizedSession(message);
        });

        return () => {
            unsubscribe();
        };
    }, [handleUnauthorizedSession]);

    const loginMutation = useMutation({
        mutationFn: useAuthLogin,
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    });

    const newPasswordMutation = useMutation({
        mutationFn: useAuthNewPassword,
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    });

    const handleLogin = async(email: string, password: string) => {
        try {
            initValues();

            const username = email;
            const response = await loginMutation.mutateAsync({ password, username });
            
            queryClient.invalidateQueries({ queryKey: ['currentUser']});

            if(response?.session) {
                localStorage.setItem("session", response.session);
                return { success: false, data: null, cambiarPassword: true };
            }

            if (response?.token) {
                setToken(response?.token);
                
                await procesarPerfil();

                setIsAuthenticated(true);                
                setIsLoading(false);
                
                return { success: true, data: null, cambiarPassword: false };
            } else {
                setIsLoading(false);
                const errorMessage = response?.message || 'Autenticación fallida';
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

    const handleLoginWithToken = async (token: string) => {
        try {
            unauthorizedHandledRef.current = false;
            clearSessionExpiredModalState();
            setToken(token);
            setIsAuthenticated(true);
            await procesarPerfil();
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            setIsLoading(false);
        } catch (error) {
            console.error("Error logging in with token:", error);
            setIsLoading(false);
        }
    };

    const handleNewPassword = async(email: string, password: string) => {
        try {
            initValues();

            const username = email;
            const token = localStorage.getItem("session") || "";
            const response = await newPasswordMutation.mutateAsync({ newPassword: password, username, token });
            
            localStorage.removeItem("session");

            queryClient.invalidateQueries({ queryKey: ['currentUser']});

            if (response?.token) {
                setToken(response?.token);

                await procesarPerfil();
                
                setIsAuthenticated(true);
                setIsLoading(false);
                
                return { success: true, data: null };
            } else {
                setIsLoading(false);
                const errorMessage = response?.message || 'Autenticación fallida';
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

    const procesarPerfil = async() => {
        // const perfil = await refetch();

        // if (perfil.data) {
        //     const datos = perfil.data.data;

        //     const auth = {
        //         name: `${datos.nombre} ${datos.apellido_paterno} ${datos.apellido_materno}`,
        //         email: datos.correo,
        //         photo: datos.foto_perfil_url,
        //         city: datos.nombre_ciudad,
        //         phone: datos.telefonos?.find((item) => item.tipo === "Celular")?.numero ?? "0000000000",
        //         perfil: datos,
        //     };

        //     setUser(auth);

        //     const encry = await encryptData(auth);
        //     setAuthModel(encry);
        // } else {
        //     setUser(null);
        // }
    };

    const logoutMutation = useMutation({
        mutationFn: useLogout,
        onSuccess: () => {
            cleanStorage();
            setUser(null);
            setIsLogout(true);
            setIsAuthenticated(false);
            setIsTokenExpired(false);
            queryClient.clear();
        }
    });

    const handleLogout = async () => {
        unauthorizedHandledRef.current = false;
        clearSessionExpiredModalState();
        setIsLogout(true);
        setIsAuthenticated(false);
        setIsTokenExpired(false);
        await logoutMutation.mutate();
    };

    const clearError = () => {
        setError(null);
    };

    const initValues = () => {
        unauthorizedHandledRef.current = false;
        clearSessionExpiredModalState();
        setUser(null);
        setIsLoading(true);
        setIsAuthenticated(false);
        setError(null);
        setIsTokenExpired(false);   
        setIsLogout(false);
    }

    const value = {
        user,
        isLoading,
        isAuthenticated,
        error,
        isInitializing,
        isTokenExpired,
        isLogout,
        login: handleLogin,
        loginWithToken: handleLoginWithToken,
        logout: handleLogout,
        clearError,
        setUser,
        newPassword: handleNewPassword,
    }

    const handleSessionExpiredConfirm = () => {
        clearSessionExpiredModalState();
        setError(null);
        window.location.hash = AppRoutingPaths.RAIZ;
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            <Dialog open={showSessionExpiredModal} disableEscapeKeyDown onClose={() => {}}>
                <DialogTitle>Inicio de sesión expirado</DialogTitle>
                <DialogContent>
                    <DialogContentText>{sessionExpiredMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleSessionExpiredConfirm} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
