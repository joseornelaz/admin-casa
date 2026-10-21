import { jwtDecode } from 'jwt-decode';
import { decryptData } from '../utils/crypto';
import { getSubdomainKey } from '../utils/Helpers';
import type { PlanEstudioSeleccionado } from '../types/PlanesEstudio.interface';

const TOKEN_STORAGE_KEY = import.meta.env.VITE_APP_AUTH_TOKEN + getSubdomainKey();
const AUTH_MODEL_STORAGE_KEY = import.meta.env.VITE_APP_AUTH + getSubdomainKey();
const FORO_KEY = import.meta.env.VITE_APP_FORO  + getSubdomainKey();
const TAB_SELECTED_KEY = import.meta.env.VITE_APP_TAB_SELECTED  + getSubdomainKey();
const CURSO_SELECTED = import.meta.env.VITE_APP_CURSO  + getSubdomainKey();
const PLAN_ESTUDIO_STORAGE_KEY = 'planEstudioSelected' + getSubdomainKey();

export const checkAuthStatus = async (): Promise<{ isAuth: boolean; tokenExpired: boolean }> => {
  const token = getToken();
  if (!token) return { isAuth: false, tokenExpired: false };

  try {
    const decoded: { exp?: number } = jwtDecode(token);

    if (!decoded?.exp) {
      console.warn('Token does not have an expiration time');
      return { isAuth: false, tokenExpired: false };
    }
    
    const expired = Date.now() >= decoded.exp * 1000;

    return { isAuth: !expired, tokenExpired: expired };
  } catch (error) {
    console.error('Error decoding token', error);
    return { isAuth: false, tokenExpired: false };
  }
};

export const getToken = (): string => {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
};

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getAuthModel = async() => {
    const encry = localStorage.getItem(AUTH_MODEL_STORAGE_KEY) || "";
    const authModel = await decryptData(encry);
    return authModel; 
}

export const setAuthModel = (auth: string): void => {
    localStorage.setItem(AUTH_MODEL_STORAGE_KEY, auth);
}

/**
 * Único punto de persistencia del espacio de trabajo activo.
 * El estado vive en AuthContext; aquí solo se escribe/lee el storage.
 */
export const setPlanEstudioSelectedStorage = (plan: PlanEstudioSeleccionado): void => {
    localStorage.setItem(PLAN_ESTUDIO_STORAGE_KEY, JSON.stringify(plan));
};

export const getPlanEstudioSelectedStorage = (): PlanEstudioSeleccionado | undefined => {
    const raw = localStorage.getItem(PLAN_ESTUDIO_STORAGE_KEY);
    if (!raw) return undefined;

    try {
        const plan = JSON.parse(raw) as PlanEstudioSeleccionado;
        // Un objeto vacío o corrupto equivale a "sin selección"
        if (typeof plan?.id_empresa === 'number' && typeof plan?.id_plan === 'number') {
            return plan;
        }
        return undefined;
    } catch {
        return undefined;
    }
};

export const removePlanEstudioSelectedStorage = (): void => {
    localStorage.removeItem(PLAN_ESTUDIO_STORAGE_KEY);
};

export const cleanStorage = (): void => {
    // Remove Authorization token used in Interceptor
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    // Remove Authentication model
    localStorage.removeItem(AUTH_MODEL_STORAGE_KEY);

    // Remove workspace selection
    localStorage.removeItem(PLAN_ESTUDIO_STORAGE_KEY);

    localStorage.removeItem(CURSO_SELECTED);
    localStorage.removeItem(TAB_SELECTED_KEY);
    localStorage.removeItem(FORO_KEY);
}

// export const setForoSelected = (foro: string) => {
//   localStorage.setItem(FORO_KEY, foro);
// }

// export const getForoSelected = (): string => {
//   return localStorage.getItem(FORO_KEY) || '';
// }

// export const setCursoSelected = (curso: string) => {
//   localStorage.setItem(CURSO_SELECTED, curso);
// }

// export const getCursoSelected = (): string => {
//   return localStorage.getItem(CURSO_SELECTED) || '{}';
// }

// export const setVervideoBienvenida = (visto: string) => {
//   localStorage.setItem('videoBienvenida', visto);
// }

// export const getVervideoBienvenida = (): string => {
//   return localStorage.getItem('videoBienvenida') || ''
// }

// export const setTerminoCondiciones = (visto: string) => {
//   localStorage.setItem('aceptarTerminos', visto);
// }

// export const getTerminoCondiciones = (): string => {
//   return localStorage.getItem('aceptarTerminos') || ''
// }


// export const setTabSelected = (tab: { tab: string, index: number }) => {
//   const tabs: { tab: string; index: number }[] = JSON.parse(localStorage.getItem(TAB_SELECTED_KEY) || '[]');

//   const existingIndex = tabs.findIndex((item: any) => item.tab === tab.tab);

//   if (existingIndex >= 0) {
//     tabs[existingIndex].index = tab.index;
//   } else {
//     tabs.push(tab);
//   }

//   localStorage.setItem(TAB_SELECTED_KEY, JSON.stringify(tabs));
// };

// export const getTabSelected = (tab: string) => {
//   const tabs: { tab: string; index: number }[] = JSON.parse(localStorage.getItem(TAB_SELECTED_KEY) || '[]');

//   return tabs.find((item) => item.tab === tab)?.index || 0;
// };