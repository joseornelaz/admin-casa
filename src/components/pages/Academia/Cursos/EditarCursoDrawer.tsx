import React from "react";
import { CursoDrawer, type ModuleItem } from "./CursoDrawer";
import type { Curso } from "../../../../types/Cursos.interface";

export type { ModuleItem };

export interface EditarCursoDrawerProps {
  open: boolean;
  onClose: () => void;
  cursoData?: Curso | null;
  onSave?: (data: any) => void;
}

export const EditarCursoDrawer: React.FC<EditarCursoDrawerProps> = (props) => {
  return <CursoDrawer mode="edit" {...props} />;
};

export default EditarCursoDrawer;
