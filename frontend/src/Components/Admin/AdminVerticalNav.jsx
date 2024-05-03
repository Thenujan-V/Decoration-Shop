import React from 'react'
import { logoPic } from '../Assets'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faBell, faMoneyBill, faGear, faRightFromBracket, faCircleInfo, faGauge, faListCheck, faUserTie, faComment, faFileWaveform  } from '@fortawesome/free-solid-svg-icons'


const AdminVerticalNav = () => {
  return (
    <div className='adminVerticalNav'>
        <div className='logo'><img src={logoPic} alt="" /></div>
        <div className="">
          <div className='profile'>
            <Link to='' className='link'><FontAwesomeIcon icon={faUser} /> Profile</Link>
          </div>
          <div className='links'>
            <Link to='/admindashboard' className='link'><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
            <Link to='/booking' className='link'><FontAwesomeIcon icon={faListCheck} /> BOOKING</Link>
            <Link to='/employeeManagement' className='link'><FontAwesomeIcon icon={faUserTie} /> EMPLOYEE MANAGEMENT</Link>
            <Link to='' className='link'><FontAwesomeIcon icon={faBell} /> Notification  Management</Link>
            <Link to='/customerMgt' className='link'><FontAwesomeIcon icon={faUser} /> CUSTOMER MANAGEMENT</Link>
            <Link to='/reviewCheck' className='link'><FontAwesomeIcon icon={faComment} /> FEEDBACK  MANAGEMENT</Link>
          </div>
          <div className='otherLinks'>            
            <Link to='' className='link'><FontAwesomeIcon icon={faFileWaveform} /> REPORT</Link>
            <Link to='' className='link'><FontAwesomeIcon icon={faGear} /> Settings</Link>
            <Link to='' className='link'><FontAwesomeIcon icon={faCircleInfo} /> help</Link>
          </div>
        </div>
    </div>
  )
}

export default AdminVerticalNav