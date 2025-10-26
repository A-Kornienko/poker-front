import axios from "axios"
import { getDomain, getPrefixApi } from "../helpers/router";

export default class TableStateService {

    static getTableStateSSE(tableId) {
        return new EventSource(getDomain() + getPrefixApi() + 'table-state/' + tableId);
    }
}