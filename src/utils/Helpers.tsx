// import { AppRoutingPaths } from "@constants";
import { IMask } from "react-imask";
import { format } from 'date-fns';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import type { JSX } from "react";

export const CustomMask = {
  phone: "(000) 000-0000",
  zip: "00000",
} as const;

type TypeMask = keyof typeof CustomMask | string;

export const formatWithIMask = (value: string, typeMask: TypeMask): string => {
  const mask = CustomMask[typeMask as keyof typeof CustomMask];

  if (!mask) {
    console.warn(`No mask found for typeMask "${typeMask}". Returning raw value.`);
    return value;
  }

  const iMask = IMask.createMask({
    mask,
  });

  iMask.resolve(value);

  return iMask.value;
};

// export const ShowBackMenuRoutes = [
//     AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace("/:id",""),
//     AppRoutingPaths.PLAN_ESTUDIO_INFORMACION.replace("/:id",""),
//     AppRoutingPaths.VIDEOTECA_DETALLE,
//     AppRoutingPaths.CALIFICACIONES_DETALLE.replace("/:id",""),
//     AppRoutingPaths.FOROS.replace("/:id",""),
//     AppRoutingPaths.CONSEJERIAINFO
// ];

type PreviewFile = {
  file: File;
  preview?: string;
};

export async function convertRemoteToPreviewFile(remote: {nombre_original: string; ruta_archivo: string; tipo_mime: string;}): Promise<PreviewFile> {
  const response = await fetch(remote.ruta_archivo);
  const blob = await response.blob();

  const file = new File([blob], remote.nombre_original, { type: remote.tipo_mime });

  return {
    file,
    preview: remote.tipo_mime.startsWith('image/') ? remote.ruta_archivo : undefined,
  };
}

export const FormatearFecha = (fecha: string) => format(new Date(fecha), 'dd/MM/yyyy HH:mm a');

export const getSubdomainKey = () => {
  const host = window.location.hostname;

  if (host === "localhost") {
    return "_local";
  }
  
  const parts = host.split(".");
  const subdomain = parts.length > 2 ? parts[0] : "root";

  return `_${subdomain}`;
};


interface FileTypeResult {
  icon: JSX.Element;
  descripcion: string;
  color: 'error' | 'primary' | 'success' | 'info' | 'warning';
}

export const GetFileType = (fileName: string): FileTypeResult => {
  const esImagen = (file: string) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file);

  const esPdf = (file: string) => /\.pdf$/i.test(file);
  const esWord = (file: string) => /\.(doc|docx)$/i.test(file);
  const esExcel = (file: string) => /\.(xls|xlsx)$/i.test(file);

  if (esPdf(fileName)) {
    return {
      icon: <PictureAsPdfIcon color="error" />,
      descripcion: 'Documento PDF',
      color: 'error',
    };
  }

  if (esImagen(fileName)) {
    return {
      icon: <ImageIcon color="success" />,
      descripcion: 'Imagen',
      color: 'success',
    };
  }

  if (esWord(fileName)) {
    return {
      icon: <DescriptionIcon color="primary" />,
      descripcion: 'Documento Word',
      color: 'primary',
    };
  }

  if (esExcel(fileName)) {
    return {
      icon: <TableChartIcon color="success" />,
      descripcion: 'Hoja de cálculo',
      color: 'success',
    };
  }

  return {
    icon: <InsertDriveFileIcon color="info" />,
    descripcion: 'Archivo',
    color: 'info',
  };
};

/**
 * Transforma una fecha en formato ISO (YYYY-MM-DD) a formato amigable (D Mmm YYYY).
 * Ejemplo: "2025-09-01" -> "1 Sep 2025"
 * "2025-10-30" -> "30 Oct 2025"
 * * @param dateString Fecha en formato "YYYY-MM-DD"
 * @returns Fecha formateada como "D Mmm YYYY" o un string vacío si la entrada es inválida.
 */

type FriendlyDateFormat = 'full' | 'short';

export const formatFriendlyDate = (
  dateString: string, 
  format: FriendlyDateFormat = 'full'
): string => {
  if (!dateString) return '';

  // Evitamos el desfase de zona horaria forzando la hora local local
  const date = new Date(`${dateString}T00:00:00`);

  if (isNaN(date.getTime())) {
    return '';
  }

  // Formateamos el mes abreviado (ej: "sep.", "oct.")
  const monthFormatter = new Intl.DateTimeFormat('es-ES', { month: 'short' });
  const month = monthFormatter.format(date).replace('.', '');
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  // Retornamos según el formato solicitado
  if (format === 'short') {
    // Obtenemos los últimos 2 dígitos del año (ej: 2025 -> "25")
    const shortYear = date.getFullYear().toString().slice(-2);
    return `${capitalizedMonth} ${shortYear}`;
  }

  // Formato 'full' (por defecto)
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day} ${capitalizedMonth} ${year}`;
};

const VALID_STATUSES: Set<string> = new Set([
  "normal",
  "transparent",
  "default",
  "prueba",
  "activa",
  "inactivo",
]);

export const parseStatus = (valor?: string): any => {
    if (!valor) return "default"; // Valor por defecto
    
    const normalized = valor.trim().toLowerCase();
    
    // Validamos que realmente pertenezca a los tipos permitidos
    if (VALID_STATUSES.has(normalized)) {
        return normalized as any;
    }
    
    return "default";
};