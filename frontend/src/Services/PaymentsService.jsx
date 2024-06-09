import axios from "axios";
import { getToken } from "./JwtToken";

const BASR_API_URL = `http://localhost:3500/api`

const jwtToken = getToken()

export const addPaymentMethod = async (paymentData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/payment/addpaymentmethod`, paymentData, {
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

export const addPayment = async (paymentData) => {
    try{
        const response = await axios.put(`${BASR_API_URL}/payment/addpayment`, paymentData, {
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

export const paymentdetails = async (order_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/payment/paymentdetails/${order_id}`, {
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