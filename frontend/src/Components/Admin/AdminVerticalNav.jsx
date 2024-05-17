import React from 'react'
import { logoPic } from '../Assets'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faBell, faMoneyBill, faGear, faRightFromBracket, faCircleInfo, faGauge, faListCheck, faUserTie, faComment, faFileWaveform  } from '@fortawesome/free-solid-svg-icons'


const AdminVerticalNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };
  return (
    <div className='adminVerticalNav'>
      <div className='logo'><img src={logoPic} alt="" /></div>
      <div className="navlinks">
        <div className='profile'>
          <Link to='' className={`link ${isActive('')}`}><FontAwesomeIcon icon={faUser} /> Profile</Link>
        </div>
        <div className='links'>
          <Link to='/admindashboard' className={`link ${isActive('/admindashboard')}`}><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
          <Link to='/booking' className={`link ${isActive('/booking')}`}><FontAwesomeIcon icon={faListCheck} /> BOOKING</Link>
          <Link to='/employeeManagement' className={`link ${isActive('/employeeManagement')}`}><FontAwesomeIcon icon={faUserTie} /> EMPLOYEE MANAGEMENT</Link>
          <Link to='' className={`link ${isActive('')}`}><FontAwesomeIcon icon={faBell} /> Notification Management</Link>
          <Link to='/customerMgt' className={`link ${isActive('/customerMgt')}`}><FontAwesomeIcon icon={faUser} /> CUSTOMER MANAGEMENT</Link>
          <Link to='/reviewCheck' className={`link ${isActive('/reviewCheck')}`}><FontAwesomeIcon icon={faComment} /> FEEDBACK MANAGEMENT</Link>
        </div>
        <div className='otherLinks'>            
          <Link to='' className={`link ${isActive('')}`}><FontAwesomeIcon icon={faFileWaveform} /> REPORT</Link>
          <Link to='' className={`link ${isActive('')}`}><FontAwesomeIcon icon={faGear} /> Settings</Link>
          <Link to='' className={`link ${isActive('')}`}><FontAwesomeIcon icon={faCircleInfo} /> help</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminVerticalNav