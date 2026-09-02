# 📋 Resumen de Avances y Control de Cambios - Admin Casa

**Proyecto:** `admin-casa-main`  
**Fecha:** 5 de Agosto, 2026  
**Estado General:** Compilación limpia y sin errores de TypeScript (`0 errors`).

---

## 🎯 Resumen Ejecutivo

Se han implementado nuevas pantallas y componentes de arquitectura siguiendo las maquetas y requerimientos visuales del cliente. Se estructuró un nuevo sistema de layout (**`GlobalTemplate`**) sin modificar ni destruir los componentes anteriores (`MainTemplate`), permitiendo una coexistencia limpia e independiente.

---

## 🚀 Módulos y Funcionalidades Desarrolladas

### 1. Pantalla de Selección de Espacio de Trabajo (`SeleccionEspacio`)
* **Ruta Creada**: `/seleccionar-espacio` (`AppRoutingPaths.SELECCION_ESPACIO`).
* **Ubicación**: `src/components/pages/Authorization/SeleccionEspacio/SeleccionEspacio.tsx`.
* **Características Clave**:
  * **Flujo Post-Login**: Al iniciar sesión en `Login.tsx`, el usuario es redirigido primero a esta pantalla.
  * **Modo de Vista Dual**:
    * **`Tabs`**: Pestañas superiores por organización (`AG College`, `Coppel Universidad`, `UMi`) y lista de selección de programas académicos con radio buttons, tag `reciente` y contador de alumnos.
    * **`Lista`**: Tarjeta unificada con acordeones colapsables/desplegables por organización.
  * **Badges Anticorte (`OrgBadge`)**: Componente custom con padding y dimensiones adaptativas para garantizar que las siglas de las organizaciones (`AG`, `CU`, `UMi`) nunca se corten.
  * **Acción de Ingreso**: Habilitación dinámica del botón *"Ingresar al sistema"* con persistencia en `localStorage`.

---

### 2. Nuevo Layout Unificado (`GlobalTemplate`)

#### A. Header Superior (`GlobalHeader`)
* **Ubicación**: `src/components/organisms/GlobalHeader/GlobalHeader.tsx`.
* **Componentes**:
  * Logo de marca y título `Admin Global`.
  * Dropdown selector de organización en tiempo real (`AG College`, `Coppel Universidad`, `UMi`).
  * Buscador global con diseño dark glass e indicador de atajo de teclado (`⌘K`).
  * Botón `Recorrido`, notificación con badge y dropdown de Perfil de Usuario (`Ana Belén Ávila`).

#### B. Sidenav Lateral y Colapsable (`GlobalSidenav`)
* **Ubicación**: `src/components/organisms/GlobalSidenav/GlobalSidenav.tsx`.
* **Características Clave**:
  * **Tarjeta de Contexto & Menú de Programas**:
    * Al hacer clic en la tarjeta del programa activo (*"Diplomado en Administración / Programa activo"*), despliega un menú contextual con la lista de programas y la opción **`Cambiar cuenta`** (redirige a `/seleccionar-espacio`).
  * **Toggle de Colapso (< / >)**:
    * Botón circular flotante en el borde superior derecho para alternar entre el estado expandido (**250px**) y colapsado (**68px**).
  * **Modo Compacto con Tooltips**:
    * En estado colapsado muestra una barra limpia centrada de iconos con **Tooltips** en hover.
  * **Estructura de Menús Categorizados**:
    * `Inicio` (Destacado activo).
    * `ALUMNOS`: *Consulta de Alumnos*, *Alta Única*.
    * `GESTIÓN`: *Captura de Asesores*, *Reportes*.
    * `ACADÉMICO`: Acordeón colapsable con *Periodos de inscripción*, *Grupos y vigencias*, *Cursos*.
    * `GESTIÓN ESCOLAR`, `USUARIOS`, `INSUMOS` (*Campus Digital*).

#### C. Canvas Principal Adaptativo (`GlobalTemplate`)
* **Ubicación**: `src/components/templates/GlobalTemplate/GlobalTemplate.tsx`.
* **Aprovechamiento de Espacio**: El contenedor de contenido derecho (`<Outlet />`) usa un sistema `flex: 1` con transición fluida. Al colapsar el Sidenav, el canvas aprovecha automáticamente el 100% del ancho disponible.

---

### 3. Rediseño de Tabla de Consulta de Alumnos (`AlumnosTable`)
* **Ubicación**: `src/components/pages/Alumnos/Consultas/AlumnosTable.tsx`.
* **Características Clave**:
  * **Indicador Lateral de Estado**: Barra vertical de color en el borde izquierdo de cada fila (`#F59E0B` para atención, `#EF4444` para baja, `#E5E7EB` para egresados).
  * **Columna ALUMNO / MATRÍCULA**: Avatar con iniciales, Nombre, Matrícula en negrita, Correo y línea de tiempo (*"Últ. act.: Hoy, 09:40 hrs"*).
  * **Columna ESTADO / CONDICIÓN**: Dot indicador con nombre de estado (*Activo*, *Egresado*, *Baja*) y chip de condición (*Regular*, *Irregular*, *Normal*, *Baja temporal*, *Materias por vencer*).
  * **Columna PRÓX. PASO**: Pills informativos con iconos (*"Próximo pago"* en azul con documento, *"2 pendientes"* / *"3 pendientes"* en naranja con advertencia, *"Reactivación"* en rojo con advertencia).
  * **Columna ACCIONES**: Enlace directo *"Seguimiento"*.
  * **Paginación Avanzada**: Pie de tabla con totales (*"Mostrando 5 de 1,247 alumnos"*), salto directo de página (*Ir: [ 1 ] [ Ir ]*) y botones estilizados *< Anterior* y *Siguiente >*.

---

### 4. Rediseño de Vista Alta Única (`AltaUnica` y `AltaUnicaTable`)
* **Ubicaciones**: `src/components/pages/Alumnos/AltaUnica/AltaUnica.tsx` y `AltaUnicaTable.tsx`.
* **Características Clave**:
  * **Header Superior**: Navegación breadcrumb (`< > Inicio > Alta Única`), título `Alta Única`, descripción del pipeline y botones de acción (*"Continuar Alta"* y *"+ Nueva Alta Única"*).
  * **Barra de Métricas de Pipeline**: Tarjetas métricas divididas (*8 INTERESADO*, *6 ELEGIBLE*, *3 COMPROMETIDO*, *3 RECHAZADO*).
  * **Sección de Búsqueda Simple y Filtros**: Input estilizado de búsqueda con botón *Buscar*, chips interactivos por estado (`Todos`, `Interesado`, `Elegible`, `Comprometido`, `Rechazado`) y selector desplegable de `Campaña`.
  * **Tabla de Prospectos**: Checkboxes por fila, `FOLIO`, `PROSPECTO` (Nombre y Nº empleado), `ESTADO` (Chip estilizado por color), `ASESOR`, `CAMPAÑA` y `FECHA`.
  * **Paginación**: Pie de tabla con totales (*"Mostrando 3 de 147 altas únicas"*) y botones de navegación *Anterior / Siguiente*.

---

### 5. Formulario de Registro de Nueva Alta Única (`NuevaAltaUnica`)
* **Ruta Creada**: `/alumnos/alta-unica/nueva` (`AppRoutingPaths.ALTA_UNICA_NUEVA`).
* **Ubicación**: `src/components/pages/Alumnos/AltaUnica/NuevaAltaUnica.tsx`.
* **Características Clave**:
  * **Stepper de Avance Interactivo**: Permite cambiar entre el **Paso 1** (con checkmark `✓` de completado) y **Paso 2** (**Documentos** activo en azul).
  * **Paso 1 - Datos Personales, Laborales, Contacto y Observaciones**: Formularios completos de captura con campos dinámicos de redes sociales y teléfonos.
  * **Paso 2 - Expediente Documental**:
    * Banner superior con selector de ruta de formación (*"Licenciatura Coppel 2020"*).
    * Indicador de avance de expediente (*"1/6"*).
    * Campos de *Modalidad del expediente* y *Estatus de recepción*.
    * **Documentación Personal**:
      * *1. Acta de Nacimiento*: Estado **`Validado`** (Verde `#16A34A`), tarjeta adjunta `ActaNacimiento.pdf 200KB` con acciones (Ver, Descargar, Editar, Eliminar), selector de acción/condición y botón *Re-subir*.
      * *2. CURP*: Estado **`RECHAZADO`** (Rojo `#DC2626`), tarjeta adjunta `HETR11021HYATHNP00.pdf 200KB` con motivo de rechazo.
      * *3. Certificado de Bachillerato*: Estado **`PENDIENTE DE REVISIÓN`** (Naranja `#D97706`), tarjeta adjunta `CERT_BACHILLERATO.pdf 512KB`.
    * **Documentación Escolar y Otros Documentos**:
      * *DOCUMENTACIÓN ESCOLAR*: Tarjeta unificada en acordeón que agrupa *4. Carta de autenticidad* (Opcional), *5. Equivalencia* (Opcional) y *6. Certificado Parcial de Estudios* (Opcional) con líneas divisorias, chevrons desplegables `v` / `^` y preservación completa de sus botones de carga, campos de acción, condición, observaciones y guardar cambios.
      * *7. Fotografías* (Opcional) con botón **`⬆ Subir archivo`** y área de comentarios.
  * **Paso 3 - Inscripción**:
    * Título y subtítulo: *"Selecciona el programa, generación y grupo en los que se inscribirá el alumno"*.
    * Tres selectores de selección desplegables:
      1. `Ruta de Formación *` (Placeholder: *"Seleccionar ruta..."*).
      2. `Generación *` (Placeholder: *"Seleccionar generación..."*).
      3. `Periodo de inscripción *` (Seleccionado: *"PERIODO-0001 · 1-30 Sep 2025"*).
  * **Paso 4 - Confirmación**:
    * Título y subtítulo: *"Revisa los datos antes de crear el Alta Única. La matrícula se generará automáticamente"*.
    * Tarjeta de resumen de prospecto con avatar con iniciales `MG`, nombre *"García López, María Elena"*, aviso *"Matrícula: será asignada al guardar"*, y chip *"Docs. incompletos"*.
    * Resumen organizado en 2 columnas: `CURP`, `FECHA DE NACIMIENTO`, `CORREO`, `TELÉFONO`, `RUTA DE FORMACIÓN`, `GENERACIÓN - GRUPO`.
    * Banner de confirmación en verde: *"Al confirmar, se creará el Alta Única, se asignará matrícula y se notificará a Servicios Escolares"*.
  * **Navegación Fija Especial del Paso 4 y Flujo de Diálogos**:
    * A la izquierda: Botón **`‹ Anterior`** para volver al Paso 3.
    * A la derecha: Leyenda `Paso 4 de 4` acompañada del botón **`Inscribir`** verde (`#16A34A`).
    * **Modal 1 (Validación / Imagen 1)**: *"Faltan campos obligatorios"* con icono de advertencia ámbar y botón *"Entendido"* si falta el `Tipo de usuario` u otro campo obligatorio.
    * **Modal 2 (Confirmación / Imagen 2)**: *"¿Seguro que deseas inscribir a este alumno?"* con botones *"Seguir editando"* e *"Inscribir"*.
    * **Modal 3 (Éxito / Imagen 3)**: *"¡Alumno inscrito!"* con icono checkmark verde, resumen de matrícula (`AGC-2026-0412`), usuario, ID alumno y botón *"Ver detalles >"* que redirige a Alta Única.

---

## 🗂️ Registro de Archivos Modificados / Creados

| Archivo | Estado | Descripción |
| :--- | :--- | :--- |
| `src/types/AppRoutingPaths.tsx` | **Modificado** | Agregadas las constantes `SELECCION_ESPACIO` y `ALTA_UNICA_NUEVA`. |
| `src/components/pages/Authorization/SeleccionEspacio/SeleccionEspacio.tsx` | **[NUEVO]** | Vista de selección de espacio de trabajo post-login. |
| `src/components/organisms/GlobalHeader/GlobalHeader.tsx` | **[NUEVO]** | Header superior con selector de org, buscador y perfil. |
| `src/components/organisms/GlobalSidenav/GlobalSidenav.tsx` | **[NUEVO]** | Sidenav colapsable con tooltips y menú contextual de programa. |
| `src/components/templates/GlobalTemplate/GlobalTemplate.tsx` | **[NUEVO]** | Layout unificado que integra Header + Sidenav + Outlet. |
| `src/components/pages/Alumnos/Consultas/AlumnosTable.tsx` | **Modificado** | Rediseño completo de la tabla de alumnos según la maqueta. |
| `src/components/pages/Alumnos/AltaUnica/AltaUnica.tsx` | **Modificado** | Rediseño completo de la página de Alta Única con pipeline y filtros. |
| `src/components/pages/Alumnos/AltaUnica/AltaUnicaTable.tsx` | **Modificado** | Tabla de prospectos con checkboxes, chips de estado y paginación. |
| `src/components/pages/Alumnos/AltaUnica/NuevaAltaUnica.tsx` | **Modificado** | Componente orquestador padre con ancla de scroll automático al inicio al avanzar o retroceder de paso. |
| `src/components/pages/Alumnos/AltaUnica/ConfirmacionInscripcionDialog.tsx` | **Modificado** | Agregada la prop opcional `onConfirm` para desacoplar el trigger de confirmación. |
| `src/components/pages/Alumnos/AltaUnica/steps/AltaUnicaStepper.tsx` | **[NUEVO]** | Componente Stepper dinámico y reutilizable con la paleta de colores del Paso 1 para todos los pasos. |
| `src/components/pages/Alumnos/AltaUnica/steps/types.ts` | **[NUEVO]** | Interfaces y tipos compartidos para las props de cada paso y del Stepper. |
| `src/components/pages/Alumnos/AltaUnica/steps/Step1DatosPersonales.tsx` | **[NUEVO]** | Sub-componente del Paso 1 (Datos Personales, Laborales, Contacto y Observaciones). |
| `src/components/pages/Alumnos/AltaUnica/steps/Step2Documentos.tsx` | **[NUEVO]** | Sub-componente del Paso 2 (Expediente Documental y Acordeón Escolar). |
| `src/components/pages/Alumnos/AltaUnica/steps/Step3Inscripcion.tsx` | **[NUEVO]** | Sub-componente del Paso 3 (Inscripción y selección de periodo). |
| `src/components/pages/Alumnos/AltaUnica/steps/Step4Confirmacion.tsx` | **[NUEVO]** | Sub-componente del Paso 4 (Resumen de prospecto y confirmación). |
| `src/components/pages/Alumnos/AltaUnica/steps/index.ts` | **[NUEVO]** | Archivo de exportación de sub-componentes de pasos. |
| `src/components/pages/Academia/Cursos/Cursos.tsx` | **Modificado** | Conectado el botón "Agregar curso" con el nuevo Sidenav lateral. |
| `src/components/pages/Academia/Cursos/AgregarCursoDrawer.tsx` | **[NUEVO]** | Sidenav lateral optimizado en dimensiones y espaciado compacto para visualizar el 100% de los campos sin necesidad de scroll. |
| `src/components/index.tsx` | **Modificado** | Exportación de `SeleccionEspacio`, `GlobalTemplate` y `NuevaAltaUnica`. |
| `src/AppRouting.tsx` | **Modificado** | Configuración de rutas asociadas al nuevo layout y formulario. |
| `src/components/pages/Authorization/Login/Login.tsx` | **Modificado** | Rediseño visual pixel-perfect de "Iniciar Sesión" y "Recuperar contraseña" con soporte dinámico de hero banner en modo oscuro y crema. |

---

## 🛠️ Verificación y Salud del Código

- **TypeScript Build**: `npx tsc --noEmit` completado exitosamente sin advertencias ni errores.
- **Compatibilidad**: Conservados todos los componentes y estructuras previas (`MainTemplate`, `Sidenav`, etc.).
