import * as Icons from "@iconsCustomizeds";
import { AppRoutingPaths } from "./AppRoutingPaths";
import { TitleScreen } from "./TitleScreen";

export interface Menu {
    id:       number;
    text:     string;
    icon:     any;
    path:     string;
    order:    number;
    visible:  number;
    children: Child[];
    menu: 'main' | 'more';
    hasCount?: boolean;
}

export interface Child {
    text: string;
    path: string;
    visible: number;
}

export const MenuRoutes: Menu[] = [
    { id: 1, text: TitleScreen.HOME, icon: Icons.Home, path: AppRoutingPaths.HOME, order: 0, visible: 0, children:[], menu: 'main' },
    { id: 2, text: TitleScreen.REGISTROS, icon: Icons.Registros, path: '', order: 1, visible: 1, 
        children:[
            { text: TitleScreen.CONSULTA, path: AppRoutingPaths.CONSULTA, visible: 1},
            { text: TitleScreen.ALTA_UNICA, path: AppRoutingPaths.ALTA_UNICA, visible: 1},
            { text: TitleScreen.HISTORIAL_CAMBIOS, path: AppRoutingPaths.HISTORIAL_CAMBIOS, visible: 1},
        ], 
        menu: 'main' 
    },
    { id: 3, text: TitleScreen.ACADEMIA, icon: Icons.Academia, path: '', order: 2, visible: 1, 
        children:[
            // { text: TitleScreen.ACTIVIDADES, path: AppRoutingPaths.ACTIVIDADES, visible: 1},
            // { text: TitleScreen.GRUPOS, path: AppRoutingPaths.GRUPOS, visible: 1},
            { text: TitleScreen.EVALUACIONES, path: AppRoutingPaths.EVALUACIONES, visible: 1},
            { text: TitleScreen.VIGENCIAS, path: AppRoutingPaths.VIGENCIAS, visible: 1},
            // { text: TitleScreen.FOROS, path: AppRoutingPaths.FOROS, visible: 1},
        ], 
        menu: 'main' },
    { id: 4, text: TitleScreen.FOROS, icon: Icons.Academia, path: AppRoutingPaths.FOROS, order: 3, visible: 1, children: [], menu: 'main'}
];
