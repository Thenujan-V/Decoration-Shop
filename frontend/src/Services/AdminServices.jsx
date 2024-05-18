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
    console.log(employeeData)
    try{
        const response = await axios.post(`${BASR_API_URL}/admin/signupemp`, employeeData)
        return response
    }
    catch(error){
        throw error
    }
}