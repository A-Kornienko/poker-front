import App from "../App";
import CashTable from "../pages/cashTable";
import Settings from "../pages/Settings";
import CashGame from "../pages/CashGame";
import { getPrefix } from "../helpers/router";

export const privateRoutes = [

];

export const publicRoute = [
    // {path: '/login', component: Login, exact: true},
    {path: '/', component: CashTable, exact: true},
    {path: '/cash-table', component: CashTable, exact: true},
    {path: '/settings', component: Settings, exact: true},
    {path: '/cash-game', component: CashGame, exact: true},
];