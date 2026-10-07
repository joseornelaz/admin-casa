import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import Box from "@mui/material/Box";

import type { RecursosResponse } from "../../../../types/Cursos.interface";
import { MODULOS_CURSOS } from "../../../../types/endpoints";

import { ContenidoEvaluacionForm } from "../AgregarElementoDialog/ContenidoEvaluacionForm";
import { ActividadForoForm } from "../AgregarElementoDialog/ActividadForoForm";
import { UpdateRecurso } from "../../../../services/CursosService";

type EditarRecursoDialogProps = {
  open: boolean;
  recurso: RecursosResponse;
  onClose: () => void;
  onSuccess?: () => void;
};

type FormValues = {
  titulo: string;
  descripcion_html: string;
};

export const EditarRecursoDialog: React.FC<EditarRecursoDialogProps> = ({
  open,
  recurso,
  onClose,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const { reset } = useForm<FormValues>({
    defaultValues: {
      titulo: "",
      descripcion_html: "",
    },
  });

  // 1. Actualiza el formulario cada vez que cambie 'modulo' o se abra el Dialog
  useEffect(() => {
    if (recurso) {
      reset({
        titulo: recurso.titulo || "",
        descripcion_html: recurso.descripcion_html || "",
      });
    }
  }, [recurso, open, reset]);

  // 2. Maneja el envío usando data validada de React Hook Form
  const onSubmit = async (data: { titulo: string; descripcion_html?: string; file?: File | null }) => {
    try {
      const response = await UpdateRecurso(recurso.id_recurso, {
        titulo: data.titulo,
        descripcion_html: data.descripcion_html,
        id_tipo_recurso: recurso.id_tipo_recurso,
        url: recurso.url,
        package_uuid: recurso.package_uuid,
        tipo_material: recurso.tipo_material,
        tipo_examen: recurso.tipo_examen,
        file: data.file || null,
      });

      console.log("Recurso actualizado:", response);
      await queryClient.invalidateQueries({
        queryKey: [MODULOS_CURSOS.GET_LISTAR_RECURSOS_MODULO.key],
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error al actualizar el recurso:", error);
    }
  };

  const renderFileUploadStep = () => <ContenidoEvaluacionForm onBack={onClose} onClose={onClose} onSubmit={onSubmit} isEditMode={true} recursoData={recurso} />;
  const renderHtmlStep = () => <ActividadForoForm onBack={onClose} onClose={onClose} onSubmit={onSubmit} isEditMode={true} recursoData={recurso}/>;

  const renderTipoRecurso = () => {
    if(recurso.id_tipo_recurso === 3 || recurso.id_tipo_recurso === 2) {
      return renderFileUploadStep();
    } else if(recurso.id_tipo_recurso === 1 || recurso.id_tipo_recurso === 5) {
      return renderHtmlStep();
    }
  }

  return (
    <Dialog isOpen={open} sxProps={{ width: 450, backgroundColor: '#FFF' }}>
        <Box sx={{p:3}}>
        {
            renderTipoRecurso()
        }
        </Box>
    </Dialog>
  );
};