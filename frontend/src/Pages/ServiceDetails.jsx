import React, { useEffect, useState } from 'react'
import { serviceDetails } from '../Components/Styles'
import Navbar from '../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchServiceDetails } from '../Services/ProductsService'
import { retrieveToken } from '../Services/JwtToken'
import { addToCard } from '../Services/CardServices'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ServiceDetails = () => {    
    const navigate = useNavigate()
    const params = useParams();
    const decodedToken = retrieveToken();

    const [user_id, setUser_id] = useState('')

    useEffect(() => {
        if(decodedToken){
            const id = decodedToken.id
            setUser_id(id)
            
            const userRole = decodedToken.role
            if(userRole === 'admin' || userRole === 'employee'){
                navigate('/unauthorized')
              }
        }
        else{
            setUser_id('')
        }
    }, [])

    const service_id = params.key

    const [service, setService] = useState('')
    const [cardResponse, setCardResponse] = useState('')

    useEffect(() => {
        const fetchData = async (service_id) => {
            try{
                const response = await fetchServiceDetails(service_id)
                setService(response)
            }
            catch(error){
                console.log('error occur:', error)
            }
        }
        fetchData(service_id)
    }, [service_id])

    const inputCard = async(service_id, user_id) => {
        if(user_id === null){
            navigate('/signin')
        }
        else{
            try{
                const formData = {
                    service_id : service_id,
                    user_Id : user_id
                }
                const response = await addToCard(formData)
                if(response.status === 201){
                    toast.success('item successfully added to card', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                    setCardResponse(response)
                }
                else{
                    toast.error('some error try again', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                }
            }
            catch(error){
                if(error.response.status === 409){
                    toast.error('item already added to card', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                }
                console.log('error occur',error)
            }
        }
    }
  return (

    <>
        <Navbar />
        <div id='serviceDetails'>
            <div className="container pb-5">
            <div className="row">
                {service && 
                    <div className="col-lg-6" id='serviceContent'>
                    <h2>{service[0].service_name}</h2>
                    <p>
                        {service[0].description}
                    </p>
                    <h5> General cost range / flower :LKR {service[0].price}</h5>
                    <button className='btn' onClick={() => inputCard(service[0].service_id, user_id?user_id : null)}>Add to Card</button>
                </div>
                }
                {
                    service && 
                    <div className="col-lg-6" id='serviceImg' style={{backgroundImage:`url(${service[0].photoUrl})`}}></div>
                }
            </div>
            </div>
        </div>
    </>
  )
}

export default ServiceDetails