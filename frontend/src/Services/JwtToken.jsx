import {jwtDecode} from 'jwt-decode';

export const getToken = () => {
    try{
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)

        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime)
        console.log(decodedToken.exp)
        if (decodedToken.exp && currentTime > decodedToken.exp) {
            localStorage.removeItem("token");
            return null
        } 
        else {
            return token
        }
    }
    catch(error){
        console.log('error get token : ',error)
        return null
    }
}
export const retrieveToken = () => {
    try{
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000);

        console.log(currentTime)
        console.log(decodedToken.exp)
        
        if (decodedToken.exp && currentTime > decodedToken.exp) {
            localStorage.removeItem("token");
            return null
        } 
        else {
            return decodedToken
        }
    }
    catch(error){
        return null
    }
}