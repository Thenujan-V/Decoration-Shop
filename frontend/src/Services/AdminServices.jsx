import axios from "axios";
import { getToken } from "./JwtToken";

const BASR_API_URL = `http://localhost:3500/api`

const jwtToken = getToken()

export const getAllEmployees = async() => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/showAllEmployees`, {
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


export const getAllAdmins = async() => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/showAllAdmins`, {
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

export const showEmployeeDetail = async(user_Id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/showEmployeeDetail/${user_Id}`, {
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

export const getAllCustomers = async() => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/getusersdetails`, {
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

export const showUserDetail = async(user_Id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/showUserDetail/${user_Id}`, {
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
export const addNewAdmin = async (adminData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/admin/signup`, adminData, {
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

export const addNewEmp = async (employeeData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/admin/signupemp`, employeeData, {
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

export const asignEmployee = async (employeeData) => {
    console.log('aes :', employeeData)
    try{
        const response = await axios.post(`${BASR_API_URL}/admin/asignemp`, employeeData, {
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

export const getQuestionsFromUsers = async () => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/getquestions`, {
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

// SMS SEND USERS WITH Twilio

export const sendSMS = async(id, datas) => {
    console.log('froeee',id, datas)
    try{
        const response = await axios.post(`${BASR_API_URL}/admin//questions/${id}/answer`, datas, {
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

export const getAllowance = async (order_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/getallowancedetails/${order_id}`, {
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