import React, { useEffect, useState } from 'react'
import { serviceDetails } from '../Components/Styles'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import { fetchServiceDetails } from '../Services/ProductsService'
import { retrieveToken } from '../Services/JwtToken'
import { addToCard } from '../Services/CardServices'

const ServiceDetails = () => {    
    const params = useParams();
    const decodedToken = retrieveToken();

    const service_id = params.key
    const user_id = decodedToken.id

    const [service, setService] = useState('')
    const [cardResponse, setCardResponse] = useState('')

    useEffect(() => {
        const fetchData = async (service_id) => {
            try{
                const response = await fetchServiceDetails(service_id)
                console.log(response)
                setService(response)
            }
            catch(error){
                console.log('error occur:', error)
            }
        }
        fetchData(service_id)
    }, [])

    const inputCard = async(service_id, user_id) => {
        console.log('si', service_id)
        console.log('ui', user_id)
        try{
            const formData = {
                service_id : service_id,
                user_Id : user_id
            }
            const response = await addToCard(formData)
            if(response.status === 201){
                alert('item successfully added to card')
                setCardResponse(response)
            }
            else{
                alert('some error try again')
            }
        }
        catch(error){
            if(error.response.status === 409){
                alert('item already added to card')
            }
            console.log('error occur',error)
        }
    }
  return (

    <>
        <Navbar />
        <div id='serviceDetails'>
            <div className="container">
            <div className="row">
                {service && 
                    <div className="col-lg-6" id='serviceContent'>
                    <h2>{service[0].service_name}</h2>
                    <p>
                        {service[0].description}
                    </p>
                    <h5> General cost range / flower :LKR {service[0].price}</h5>
                    <button className='btn' onClick={() => inputCard(service[0].service_id, user_id)}>Add to Card</button>
                </div>
                }
                <div className="col-lg-6" id='serviceImg' style={{backgroundImage:`url('https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg')`}}></div>
            </div>
            </div>
        </div>
    </>
  )
}

export default ServiceDetails