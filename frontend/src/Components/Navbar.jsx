import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {navbar} from './Styles'
import { logoPic } from './Assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { retrieveToken } from '../Services/JwtToken';

const Navbar = () => {
    const navigater = useNavigate()
    const decodedToken = retrieveToken()
    const [user_id, setUser_id] = useState('')

    useEffect(() => {
        if(decodedToken){
            const id = decodedToken.id
            setUser_id(id)
        }
        else{
            setUser_id('')
        }
    }, [])

  return (
    <>
        <nav class="navbar navbar-expand-lg" id='navbar'>
            <div class="container-fluid">
                <Link to='/' class="navbar-brand Link"> <img src={logoPic} alt="" /> SARA DECORATIONS</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div class="navbar-nav" id='navLinks'>
                        <Link to='/' class="nav-link p-3 Link" >Home</Link>
                        <Link to='/about' class="nav-link p-3 Link" >About</Link>
                        <Link to='/service' class="nav-link p-3 Link">Services</Link>
                        <Link to='/contact' class="nav-link p-3 Link">Contact us</Link>
                        <Link to='/signup' class="nav-link p-3 Link">Signup/Signin</Link>
                    </div>
                    <div id='userIcon'>                        
                        <Link to={user_id ? '/card' : '/signin'} class="nav-link p-3 Link"> <FontAwesomeIcon icon={faCartArrowDown} size='xl'/> </Link>
                        <Link to={user_id ? '/orders' : '/signin'} class="nav-link p-3 Link"> <FontAwesomeIcon icon={faBagShopping} size='xl'/> </Link>
                        <Link to={user_id ? '/userprofile' : '/signin'} class="nav-link p-3 Link"> <FontAwesomeIcon icon={faUser} size='xl'/> </Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar