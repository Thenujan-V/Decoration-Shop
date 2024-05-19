import axios from 'axios'

const BASR_API_URL = `http://localhost:3500/api`

export const userSignup = async (formData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/user/signup`, formData)
        return response.status
    }
    catch(error){
        throw error
    }
}

export const userSignin = async (formData) => {
    try{
        
        const response = await axios.post(`${BASR_API_URL}/user/signin`, {
            mail_id : formData.mail_id,
            password : formData.password
        })
        return response
    }
    catch(error){
        throw error
    }
}

export const addQuestions = async (formData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/user/askquestions`,formData)
        return response
    }
    catch(error){
        throw error
    }
}







