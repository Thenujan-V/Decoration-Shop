import React from 'react'
import { serviceDetails } from '../Components/Styles'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'

const ServiceDetails = () => {
    const ourservices = [
        {title : 'flower', image: 'https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg', price: '200' , details : 'Welcome to Sara Decorations, your go-to destination for exquisite handcrafted decorations and personalized gifts. Nestled in the heart of Jaffna, we take pride in bringing your celebrations to life with our unique and artistic creations'},
        {title : 'flowers',  image: 'https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg', price: '200' , details : 'Welcome to Sara Decorations, your go-to destination for exquisite handcrafted decorations and personalized gifts. Nestled in the heart of Jaffna, we take pride in bringing your celebrations to life with our unique and artistic creations'},
        {title : 'Bouquets',  image: 'https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg', price: '200' , details : 'Welcome to Sara Decorations, your go-to destination for exquisite handcrafted decorations and personalized gifts. Nestled in the heart of Jaffna, we take pride in bringing your celebrations to life with our unique and artistic creations'},
        {title : 'flower Bouquets',  image: 'https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg', price: '200' , details : 'Welcome to Sara Decorations, your go-to destination for exquisite handcrafted decorations and personalized gifts. Nestled in the heart of Jaffna, we take pride in bringing your celebrations to life with our unique and artistic creations'},
    ]
    const params = useParams();
    const key = params.key
    console.log('key : ',key)

  return (

    <>
        <Navbar />
        <div id='serviceDetails'>
            <div className="container">
            <div className="row">
                <div className="col-lg-6" id='serviceContent'>
                    <h2>{ourservices[key].title}</h2>
                    <p>
                        {ourservices[key].details}
                    </p>
                    <h5> General cost range / flower :LKR {ourservices[key].price}</h5>
                    <button className='btn'>Add to Card</button>
                </div>
                <div className="col-lg-6" id='serviceImg' style={{backgroundImage:`url(${ourservices[key].image})`}}></div>
            </div>
            </div>
        </div>
    </>
  )
}

export default ServiceDetails