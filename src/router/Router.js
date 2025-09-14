import App from "../App";
import CashTable from "../pages/CashTable";
import Settings from "../pages/Settings";
import { getPrefix } from "../helpers/router";
import PokerTable from "../pages/PokerTable";

export const privateRoutes = [

];

export const publicRoute = [
    // {path: '/login', component: Login, exact: true},
    {path: '/', component: CashTable, exact: true},
    {path: '/cash-table', component: CashTable, exact: true},
    {path: '/settings', component: Settings, exact: true},
    {path: '/poker-table', component: PokerTable, exact: true},
];