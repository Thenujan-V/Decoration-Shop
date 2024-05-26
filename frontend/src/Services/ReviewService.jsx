import axios from 'axios'
import { getToken } from './JwtToken'

const BASR_API_URL = `http://localhost:3500/api`

const jwtToken = getToken()

export const addReview = async (formData) => {

    try{
        const response = await axios.post(`${BASR_API_URL}/review/addreview`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
        })
        return response.status
    }
    catch(error){
        throw error
    }
}

export const getReview = async () => {
    try{
        const response = await axios.get(`${BASR_API_URL}/review/getreview`, {
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


