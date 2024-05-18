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