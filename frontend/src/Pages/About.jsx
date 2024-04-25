import React from 'react'
import Navbar from '../Components/Navbar'
import {about} from '../Components/Styles'

const About = () => {
  return (
    <>
        <Navbar />
        <div id='about'>
            <div className="container">
            <div className="row">
                <div className="col-lg-6" id='aboutContent'>
                    <h1>About Us</h1>
                    <p>
                    Welcome to Sara Decorations, your go-to 
                    destination for exquisite handcrafted 
                    decorations and personalized gifts. Nestled 
                    in the heart of Jaffna, we take pride in 
                    bringing your celebrations to life with our 
                    unique and artistic creations. From tailor
                    made crafts for Hindu temples to bespoke 
                    decorations for birthdays and weddings, 
                    we curate designs that reflect the essence 
                    of your special moments. 
                    </p>
                    <button className='btn'>LEARN MORE</button>
                </div>
                <div className="col-lg-6" id='aboutImg'></div>
            </div>
            </div>
        </div>
    </>
  )
}

export default About