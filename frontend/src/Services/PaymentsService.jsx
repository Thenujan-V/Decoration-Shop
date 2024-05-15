import axios from "axios";

const BASR_API_URL = `http://localhost:3500/api`

export const addPaymentMethod = async (paymentData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/payment/addpaymentmethod`, paymentData)
        console.log(response)
        return response
    }
    catch(error){
        throw error
    }
}

export const addPayment = async (paymentData) => {
    try{
        const response = await axios.put(`${BASR_API_URL}/payment/addpayment`, paymentData)
        console.log('res :',response)
        return response
    }
    catch(error){
        throw error
    }
}