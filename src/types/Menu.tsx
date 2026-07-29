import * as Icons from "@iconsCustomizeds";
import { AppRoutingPaths } from "./AppRoutingPaths";
import { TitleScreen } from "./TitleScreen";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AreaChartOutlinedIcon from '@mui/icons-material/AreaChartOutlined';

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
    { id: 2, text: TitleScreen.ALUMNOS, icon: PeopleAltOutlinedIcon, path: '', order: 1, visible: 1, 
        children:[
            { text: TitleScreen.CONSULTA, path: AppRoutingPaths.CONSULTA, visible: 1},
            { text: TitleScreen.ALTA_UNICA, path: AppRoutingPaths.ALTA_UNICA, visible: 1},
            { text: TitleScreen.HISTORIAL_CAMBIOS, path: AppRoutingPaths.HISTORIAL_CAMBIOS, visible: 0},
        ], 
        menu: 'main' 
    },
    { id: 3, text: TitleScreen.ACADEMIA, icon: SchoolOutlinedIcon, path: '', order: 2, visible: 1, 
        children:[
            { text: TitleScreen.PERIODOS, path: AppRoutingPaths.PERIODOS, visible: 1},
            { text: TitleScreen.VIGENCIAS, path: AppRoutingPaths.VIGENCIAS, visible: 1},
            { text: TitleScreen.CURSOS, path: AppRoutingPaths.CURSOS, visible: 0},
        ], 
        menu: 'main' },
    { id: 4, text: TitleScreen.REPORTES, icon: AreaChartOutlinedIcon, path: AppRoutingPaths.REPORTES, order: 3, visible: 1, children: [], menu: 'main'}
];
