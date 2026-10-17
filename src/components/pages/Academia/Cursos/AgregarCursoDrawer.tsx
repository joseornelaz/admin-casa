import React from "react";
import { CursoDrawer } from "./CursoDrawer";

export interface AgregarCursoDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export const AgregarCursoDrawer: React.FC<AgregarCursoDrawerProps> = (props) => {
  return <CursoDrawer mode="create" {...props} />;
};

export default AgregarCursoDrawer;
