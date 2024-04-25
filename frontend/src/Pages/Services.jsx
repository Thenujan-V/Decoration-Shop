import React from 'react'
import Navbar from '../Components/Navbar'
import { aboutback } from '../Components/Assets'
import { Link } from 'react-router-dom'

const Services = () => {
    const ourservices = [
        {title : 'flower'},
        {title : 'flowers'},
        {title : 'Bouquets'},
        {title : 'flower Bouquets'},
    ]
  return (
    <>
        <Navbar />
        <div id="service">
            <div className="container">
                <h1>We transform your dreams into tangible beauty</h1>
                <div className="row justify-content-center">
                    {
                        ourservices.map((ele, index) => (
                            <div class="card col-lg-3 m-3" style={{width: '18rem'}} key={index}>
                                <img src={aboutback} class="card-img-top" alt="" />
                                <div class="card-body ">
                                    <h5 class="card-title">{ele.title}</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link to={`/servicedetails/${index}`} class="btn" >LEARN MORE</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Services