import axios from "axios";

const BASR_API_URL = `http://localhost:3500/api`

export const getEmployeeDetails = async(user_Id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/employee/showemployeedetails/${user_Id}`, user_Id)
        return response
    }
    catch(error){
        throw error
    }
}

export const getOrders = async(employee_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/employee/getorderdetails/${employee_id}`, employee_id)
        return response
    }
    catch(error){
        throw error
    }
}

export const getOrderDetails = async(order_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/employee/showorderdetails/${order_id}`, order_id)
        return response
    }
    catch(error){
        throw error
    }
}

export const taskAcceptence = async(employee_id, order_id, data) => {
    try{
        const response = await axios.put(`${BASR_API_URL}/employee/taskacceptance/${employee_id}/${order_id}`, data)
        return response
    }
    catch(error){
        throw error
    }
}

export const statusUpdate = async(employee_id, order_id, status) => {
    try{
        const response = await axios.put(`${BASR_API_URL}/employee/showorderdetails/${employee_id}/${order_id}`, status)
        return response
    }
    catch(error){
        throw error
    }
}