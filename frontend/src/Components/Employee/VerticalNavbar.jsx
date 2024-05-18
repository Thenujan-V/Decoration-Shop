import React, { useState } from 'react'
import { verticalNavbar } from '../Styles'
import { logoPic } from '../Assets'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faBell, faMoneyBill, faGear, faRightFromBracket, faCircleInfo, faGauge  } from '@fortawesome/free-solid-svg-icons'


const VerticalNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <div className='verticalNav'>
        <div className='logo'><img src={logoPic} alt="" /></div>
        <div className="">
          <div className='profile'>
            <Link to='' className={`link ${isActive('/employeeprofile')}`}><FontAwesomeIcon icon={faUser} /> Profile</Link>
          </div>
          <div className='links'>
            {/* <Link to='' className={`link ${isActive('/emphome')}`}><FontAwesomeIcon icon={faHouse} /> Home</Link> */}
            <Link to='/empdashboard' className={`link ${isActive('/empdashboard')}`}><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
            <Link to='' className={`link ${isActive('/empnotification')}`}><FontAwesomeIcon icon={faBell} /> Notifications</Link>
            <Link to='/empallowance' className={`link ${isActive('/empallowance')}`}><FontAwesomeIcon icon={faMoneyBill} /> Allowance</Link>
          </div>
          <div className='otherLinks'>
            <Link to='/setting' className={`link ${isActive('/setting')}`}><FontAwesomeIcon icon={faGear} /> Settings</Link>
            <Link to='/logout' className={`link ${isActive('/logout')}`}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
            <Link to='/help' className={`link ${isActive('/help')}`}><FontAwesomeIcon icon={faCircleInfo} /> help</Link>
          </div>
        </div>
    </div>
  )
}

export default VerticalNavbar