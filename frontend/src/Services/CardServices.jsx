import axios from "axios";

const BASR_API_URL = `http://localhost:3500/api`

export const addToCard = async(formData) => {

    try{

        const response = await axios.post(`${BASR_API_URL}/card/addtocard`, formData)
        console.log('response : ', response)
        return response
    }
    catch(error){
        throw error
    }
}

export const viewCartItems = async (user_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/card/showcard/${user_id}`, user_id)
        return response
    }
    catch(error){
        throw error
    }
}

export const updateQuantity = async (service_id,quantity) => {
    try{
        const response = await axios.put(`${BASR_API_URL}/card/updatequantity/${service_id}`, quantity, service_id)
        return response
    }
    catch(error){
        throw error
    }
}