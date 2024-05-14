import axios from "axios";

const BASR_API_URL = `http://localhost:3500/api`

export const fetchServices = async () => {
    try{
        const response = await axios.get(`${BASR_API_URL}/services/viewservice`)
        console.log(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}
export const fetchServiceDetails = async (service_id) => {
    try{
        const response = await axios.get(`${BASR_API_URL}/services/viewservicedetails/${service_id}`)
        console.log(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}