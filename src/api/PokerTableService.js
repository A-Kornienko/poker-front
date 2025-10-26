import axios from "axios"
import { getDomain, getPrefixApi } from "../helpers/router";

export default class PokerTableService {

    static async getPlayersInfo(settingId) {
        const response = await axios.get(getDomain() + getPrefixApi() + 
        'cash-tables/' + settingId + '/players')

        return response
    }
}