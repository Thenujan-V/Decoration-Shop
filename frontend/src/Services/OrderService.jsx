import axios from 'axios';
import { getToken } from './JwtToken';

const BASR_API_URL = `http://localhost:3500/api`

const jwtToken = getToken()

export const addToOrder = async (formData) => {
    console.log('fd :',formData)
    try{
        const response = await axios.post(`${BASR_API_URL}/order/placeorder`, formData, {
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

export const getOrders = async (user_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/order/vieworders/${user_id}`, {
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
export const getLeastOrder = async (user_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/order/getleastorder/${user_id}`, {
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

export const getAllOrders = async () => {
    try{
        const response = await axios.get(`${BASR_API_URL}/order/viewallorders`, {
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

export const getOrdersDetails = async (order_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/order/getorderdetails/${order_id}`, {
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

export const updatePaymentStatus = async (data) => {
    try{
        console.log('data :',data)
        const response = await axios.put(`${BASR_API_URL}/order/updatepaymentstatus/${data.order_id}`, data, {
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