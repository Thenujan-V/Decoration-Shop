import axios from 'axios';

const BASR_API_URL = `http://localhost:3500/api`

export const addToOrder = async (formData) => {
    console.log('fd :',formData)
    try{
        const response = await axios.post(`${BASR_API_URL}/order/placeorder`, formData)
        console.log('response : ', response)
        return response
    }
    catch(error){
        throw error
    }
}
