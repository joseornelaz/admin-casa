import type { RegistroVigenciaFormData } from "./schema";

export type { RegistroVigenciaFormData };

export interface VigenciaDialogProps {
  isOpen?: boolean;
  close: (isConfirmacion: boolean) => void;
  idVigencia?: number;
}

export interface StepItem {
  id: number;
  label: string;
}
