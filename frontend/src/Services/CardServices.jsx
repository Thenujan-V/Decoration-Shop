import axios from "axios";
import { getToken } from "./JwtToken";

const BASR_API_URL = `http://localhost:3500/api`

const jwtToken = getToken()

export const addToCard = async(formData) => {

    try{

        const response = await axios.post(`${BASR_API_URL}/card/addtocard`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
        })

        console.log('response : ', response)
        return response
    }
    catch(error){
        throw error
    }
}

export const viewCartItems = async (user_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/card/showcard/${user_id}`, {
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

export const updateQuantity = async (service_id,quantity) => {
    try{
        const response = await axios.put(`${BASR_API_URL}/card/updatequantity/${service_id}`, quantity, {
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
export const deleteCardItem = async (card_id) => {
    try{
        const response = await axios.delete(`${BASR_API_URL}/card/removeitem/${card_id}`, {
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