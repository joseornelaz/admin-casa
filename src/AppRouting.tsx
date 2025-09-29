import { createHashRouter } from "react-router-dom";
import App from "./App";
import MainTemplate from "./components/templates/MainTemplate/MainTemplate";
import { AppRoutingPaths } from "@constants";
import * as Component from "@components";


export const AppRouting = createHashRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: MainTemplate //aqui debe ir el login
            },
            {
                // Component: ProtectedRoute,
                children: [
                    {
                        Component: MainTemplate,
                        children: [
                            {
                                path: AppRoutingPaths.GRUPOS,
                                Component: Component.Grupos
                            },
                            {
                                path: AppRoutingPaths.ACTIVIDADES,
                                Component: Component.Actividades
                            },
                            {
                                path: AppRoutingPaths.FOROS,
                                Component: Component.Foros
                            },
                            {
                                path: AppRoutingPaths.VIGENCIAS,
                                Component: Component.Vigencias
                            },
                            {
                                path: AppRoutingPaths.ALTA_UNICA,
                                Component: Component.AltaUnica
                            },
                            {
                                path: AppRoutingPaths.CONSULTA,
                                Component: Component.Consultas
                            },
                            {
                                path: AppRoutingPaths.HISTORIAL_CAMBIOS,
                                Component: Component.HistorialCambios
                            },
                        ]
                    }
                ]
            },
        ],
    }
]);