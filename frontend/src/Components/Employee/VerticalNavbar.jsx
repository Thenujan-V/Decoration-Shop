import React, { useState } from 'react'
import { logoPic } from '../Assets'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faBell, faMoneyBill, faGear, faRightFromBracket, faCircleInfo, faGauge  } from '@fortawesome/free-solid-svg-icons'


const VerticalNavbar = () => {
  
  return (
    <div className='verticalNav'>
        <div className='logo'><img src={logoPic} alt="" /></div>
        <div className="">
          <div className='profile'>
            <Link to='' className='link'><FontAwesomeIcon icon={faUser} /> Profile</Link>
          </div>
          <div className='links'>
            <Link to='' className='link'><FontAwesomeIcon icon={faHouse} /> Home</Link>
            <Link to='/empdashboard' className='link'><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
            <Link to='' className='link'><FontAwesomeIcon icon={faBell} /> Notifications</Link>
            <Link to='/allowance' className='link'><FontAwesomeIcon icon={faMoneyBill} /> Allowance</Link>
          </div>
          <div className='otherLinks'>
            <Link to='' className='link'><FontAwesomeIcon icon={faGear} /> Settings</Link>
            <Link to='' className='link'><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
            <Link to='' className='link'><FontAwesomeIcon icon={faCircleInfo} /> help</Link>
          </div>
        </div>
    </div>
  )
}

export default VerticalNavbar