import React from "react";

export interface RedSocialItem {
  id: string;
  link: string;
  network: string;
}

export interface TelefonoItem {
  id: string;
  number: string;
  type: string;
}

export interface Step1Props {
  // Datos Personales
  nombre: string;
  setNombre: (val: string) => void;
  apellidoPaterno: string;
  setApellidoPaterno: (val: string) => void;
  apellidoMaterno: string;
  setApellidoMaterno: (val: string) => void;
  fechaNacimiento: string;
  setFechaNacimiento: (val: string) => void;
  curp: string;
  setCurp: (val: string) => void;
  correo: string;
  setCorreo: (val: string) => void;
  telefono: string;
  setTelefono: (val: string) => void;
  genero: string;
  setGenero: (val: string) => void;

  // Datos Laborales
  corporacion: string;
  setCorporacion: (val: string) => void;
  asociacion: string;
  setAsociacion: (val: string) => void;
  empresa: string;
  setEmpresa: (val: string) => void;
  programaAcademico: string;
  setProgramaAcademico: (val: string) => void;
  rutaEstudios: string;
  setRutaEstudios: (val: string) => void;
  tipoUsuario: string;
  setTipoUsuario: (val: string) => void;
  estado: string;
  setEstado: (val: string) => void;
  ciudad: string;
  setCiudad: (val: string) => void;
  centro: string;
  setCentro: (val: string) => void;
  region: string;
  setRegion: (val: string) => void;
  puesto: string;
  setPuesto: (val: string) => void;

  // Datos de Contacto
  calle: string;
  setCalle: (val: string) => void;
  numero: string;
  setNumero: (val: string) => void;
  colonia: string;
  setColonia: (val: string) => void;
  delegacion: string;
  setDelegacion: (val: string) => void;
  cp: string;
  setCp: (val: string) => void;
  correoEmpresa: string;
  setCorreoEmpresa: (val: string) => void;
  redesSociales: RedSocialItem[];
  setRedesSociales: React.Dispatch<React.SetStateAction<RedSocialItem[]>>;
  handleAddRedSocial: () => void;
  handleRemoveRedSocial: (id: string) => void;
  telefonos: TelefonoItem[];
  setTelefonos: React.Dispatch<React.SetStateAction<TelefonoItem[]>>;
  handleAddTelefono: () => void;
  handleRemoveTelefono: (id: string) => void;
  horariosLlamada: { [key: string]: boolean };
  setHorariosLlamada: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  accesoInternet: { [key: string]: boolean };
  setAccesoInternet: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;

  // Notas y Observaciones
  elegible: string;
  setElegible: (val: string) => void;
  interesado: string;
  setInteresado: (val: string) => void;
  campana: string;
  setCampana: (val: string) => void;
  responsable: string;
  setResponsable: (val: string) => void;
  comentarios: string;
  setComentarios: (val: string) => void;
}

export interface Step2Props {
  rutaFormacion: string;
  setRutaFormacion: (val: string) => void;
  modalidadExpediente: string;
  setModalidadExpediente: (val: string) => void;
  estatusRecepcion: string;
  setEstatusRecepcion: (val: string) => void;
  doc1Accion: string;
  setDoc1Accion: (val: string) => void;
  doc1Condicion: string;
  setDoc1Condicion: (val: string) => void;
  doc1Obs: string;
  setDoc1Obs: (val: string) => void;
  doc2Accion: string;
  setDoc2Accion: (val: string) => void;
  doc2Condicion: string;
  setDoc2Condicion: (val: string) => void;
  doc2Obs: string;
  setDoc2Obs: (val: string) => void;
  doc3Condicion: string;
  setDoc3Condicion: (val: string) => void;
  doc3Obs: string;
  setDoc3Obs: (val: string) => void;
  openDoc4: boolean;
  setOpenDoc4: (val: boolean) => void;
  doc4Accion: string;
  setDoc4Accion: (val: string) => void;
  doc4Condicion: string;
  setDoc4Condicion: (val: string) => void;
  doc4Obs: string;
  setDoc4Obs: (val: string) => void;
  openDoc5: boolean;
  setOpenDoc5: (val: boolean) => void;
  doc5Accion: string;
  setDoc5Accion: (val: string) => void;
  doc5Condicion: string;
  setDoc5Condicion: (val: string) => void;
  doc5Obs: string;
  setDoc5Obs: (val: string) => void;
  openDoc6: boolean;
  setOpenDoc6: (val: boolean) => void;
  doc6Accion: string;
  setDoc6Accion: (val: string) => void;
  doc6Condicion: string;
  setDoc6Condicion: (val: string) => void;
  doc6Obs: string;
  setDoc6Obs: (val: string) => void;
  doc7Obs: string;
  setDoc7Obs: (val: string) => void;
}

export interface Step3Props {
  insRutaFormacion: string;
  setInsRutaFormacion: (val: string) => void;
  insGeneracion: string;
  setInsGeneracion: (val: string) => void;
  insPeriodo: string;
  setInsPeriodo: (val: string) => void;
}

export interface Step4Props {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  fechaNacimiento: string;
  correo: string;
  telefono: string;
  rutaEstudios: string;
  generacionGrupo: string;
}
