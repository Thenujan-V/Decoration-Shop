import axios from "axios";
import { getToken } from "./JwtToken";
import { service } from "../Components/Styles";

const BASR_API_URL = `http://localhost:3500/api`

const jwtToken = getToken()

export const fetchServices = async () => {
    try{
        const response = await axios.get(`${BASR_API_URL}/services/viewservice`)
        return response.data
    }
    catch(error){
        throw error
    }
}
export const fetchServiceDetails = async (service_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/services/viewservicedetails/${service_id}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const addServices = async (formData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/services/addservice`, formData, {
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
            
        })
        return response
    }
    catch(error){
        throw error
    }
}

export const changeAvailability = async (service_id) => {
    console.log('service :', service_id)
    try{
        const response = await axios.put(`${BASR_API_URL}/services/changeavailability/${service_id}`, {
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
            
        })
        return response
    }
    catch(error){
        throw error
    }
}