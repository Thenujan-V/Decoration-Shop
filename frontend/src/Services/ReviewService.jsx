import axios from 'axios'

const BASR_API_URL = `http://localhost:3500/api`

export const addReview = async (formData) => {

    try{
        const response = await axios.post(`${BASR_API_URL}/review/addreview`, formData)
        return response.status
    }
    catch(error){
        throw error
    }
}

export const getReview = async () => {
    try{
        const response = await axios.get(`${BASR_API_URL}/review/getreview`)
        return response
    }
    catch(error){
        throw error
    }
}


