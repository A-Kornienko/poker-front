import axios from "axios"
import { getDomain, getPrefixApi } from "../helpers/router";

export default class BetService {

    static async bet(tableId, betType, amount = 0) {
        const response = await axios.post(getDomain() + getPrefixApi() + 
        'bet/' + tableId + '/' + betType,
        { amount: amount }
    )

        return response
    }
}