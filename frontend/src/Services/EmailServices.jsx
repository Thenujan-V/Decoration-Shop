import axios from "axios";
import { getToken } from "./JwtToken";

const BASR_API_URL = `http://localhost:3500/api`

const jwtToken = getToken()

export const sendEmails = async(data) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/email/sendmail`, data, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
        })
        return response
    }
    catch(error){
        throw error
    }
}