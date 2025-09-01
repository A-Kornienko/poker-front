import axios from "axios"
import { getDomain, getPrefixApi } from "../helpers/router";

export default class CashTablesService {
    static async getTableList(limit = 10, page = 1) {
        const response = await axios.get(getDomain() + getPrefixApi() + 'cash-tables', {
            params: {
                limit: limit,
                page: page
            },
            
        })
        return response
    }

    static async getPlayersInfo(settingId) {
        const response = await axios.get(getDomain() + getPrefixApi() + 
        'cash-tables/' + settingId + '/players')

        return response
    }

    static async getSettingDetails(settingId) {
        const response = await axios.get(getDomain() + getPrefixApi() + 
        'cash-tables/' + settingId)

        return response
    }

    static async connectToTable(settingId) {
        const response = await axios.post(getDomain() + getPrefixApi() + 
        'cash-tables/' + settingId + '/connect')

        return response
    }
}