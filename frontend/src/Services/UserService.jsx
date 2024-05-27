import axios from 'axios'
import { getToken } from './JwtToken'

const BASR_API_URL = `http://localhost:3500/api`

const jwtToken = getToken()

export const userSignup = async (formData) => {
    try{
        const response = await axios.post(`${BASR_API_URL}/user/signup`, formData, {
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

export const getUserDetails = async (user_Id) => {
    console.log('uuu :',user_Id)

    try{
        const response = await axios.get(`${BASR_API_URL}/user/getdetails/${user_Id}`, {
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






