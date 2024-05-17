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