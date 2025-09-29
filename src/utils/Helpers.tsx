// import { AppRoutingPaths } from "@constants";
import { IMask } from "react-imask";
import { format } from 'date-fns';

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
