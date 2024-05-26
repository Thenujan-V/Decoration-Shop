import axios from "axios";

const BASR_API_URL = `http://localhost:3500/api`

export const getAllEmployees = async() => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/showAllEmployees`)
        return response
    }
    catch(error){
        throw error
    }
}


export const getAllAdmins = async() => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/showAllAdmins`)
        return response
    }
    catch(error){
        throw error
    }
}

export const showEmployeeDetail = async(user_Id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/showEmployeeDetail/${user_Id}`, user_Id)
        return response
    }
    catch(error){
        throw error
    }
}

export const getAllCustomers = async() => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/getusersdetails`)
        return response
    }
    catch(error){
        throw error
    }
}

export const showUserDetail = async(user_Id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/showUserDetail/${user_Id}`, user_Id)
        return response
    }
    catch(error){
        throw error
    }
}
export const addNewAdmin = async (adminData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/admin/signup`, adminData)
        return response
    }
    catch(error){
        throw error
    }
}

export const addNewEmp = async (employeeData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/admin/signupemp`, employeeData)
        return response
    }
    catch(error){
        throw error
    }
}

export const asignEmployee = async (employeeData) => {
    console.log('aes :', employeeData)
    try{
        const response = await axios.post(`${BASR_API_URL}/admin/asignemp`, employeeData)
        return response
    }
    catch(error){
        throw error
    }
}

export const getQuestionsFromUsers = async () => {
    try{
        const response = await axios.get(`${BASR_API_URL}/admin/getquestions`)
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
        const response = await axios.post(`${BASR_API_URL}/admin//questions/${id}/answer`, datas)
        return response
    }
    catch(error){
        throw error
    }
}