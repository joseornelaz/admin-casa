import { useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useQueryClient } from "@tanstack/react-query";
import type { ModulosResponse } from "../../../../types/Cursos.interface";
import { UpdateModulo } from "../../../../services/CursosService";
import { MODULOS_CURSOS } from "../../../../types/endpoints";

type EditarModuloDialogProps = {
  open: boolean;
  modulo: ModulosResponse | null;
  onClose: () => void;
};

type FormValues = {
  titulo: string;
};

export const EditarModuloDialog: React.FC<EditarModuloDialogProps> = ({
  open,
  modulo,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { control, reset, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      titulo: "",
    },
  });

  // 1. Actualiza el formulario cada vez que cambie 'modulo' o se abra el Dialog
  useEffect(() => {
    if (modulo) {
      reset({
        titulo: modulo.titulo || "",
      });
    }
  }, [modulo, open, reset]);

  // 2. Maneja el envío usando data validada de React Hook Form
  const onSubmit = async (data: FormValues) => {
    if (!modulo) return;

    try {
      const response = await UpdateModulo(modulo.id_modulo, {
        titulo: data.titulo,
        descripcion: modulo.descripcion,
        orden: modulo.orden,
      });

      console.log("Módulo actualizado:", response);
      await queryClient.invalidateQueries({
        queryKey: [MODULOS_CURSOS.GET_MODULOS.key],
      });
      onClose();
    } catch (error) {
      console.error("Error al actualizar el módulo:", error);
    }
  };

  return (
    <Dialog isOpen={open} sxProps={{ minWidth: 400, maxWidth: 600 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Editar nombre del módulo
        </DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <Box>
            <Typography
              sx={{
                fontSize: "0.82rem",
                fontWeight: 500,
                color: "#4B5563",
                mb: 0.5,
              }}
            >
              Nombre del módulo:
            </Typography>
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Nombre del módulo"
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: "#FAFAFA",
                        borderRadius: "10px",
                        fontSize: "0.88rem",
                        "& fieldset": { borderColor: "#E5E7EB" },
                      },
                    },
                  }}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pr: 3 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            size="small"
            sx={{ color: "#666", borderColor: "#ccc" }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};