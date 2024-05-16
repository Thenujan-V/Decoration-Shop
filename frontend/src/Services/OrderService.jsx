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

export const getOrders = async (user_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/order/vieworders/${user_id}`, user_id)
        console.log('response : ', response)
        return response
    }
    catch(error){
        throw error
    }
}
export const getLeastOrder = async (user_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/order/getleastorder/${user_id}`, user_id)
        return response
    }
    catch(error){
        throw error
    }
}

export const getAllOrders = async () => {
    try{
        const response = await axios.get(`${BASR_API_URL}/order/viewallorders`,)
        console.log('response : ', response)
        return response
    }
    catch(error){
        throw error
    }
}

export const getOrdersDetails = async (order_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/order/getorderdetails/${order_id}`,order_id)
        console.log('response : ', response)
        return response
    }
    catch(error){
        throw error
    }
}