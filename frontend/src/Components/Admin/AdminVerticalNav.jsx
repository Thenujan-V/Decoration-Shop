import React, { useEffect, useState } from 'react'
import { logoPic } from '../Assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faBell, faMoneyBill, faGear, faRightFromBracket, faCircleInfo, faGauge, faListCheck, faUserTie, faComment, faFileWaveform, faUserPlus  } from '@fortawesome/free-solid-svg-icons'
import { retrieveToken } from '../../Services/JwtToken'
import { getAllCustomers, getAllEmployees } from '../../Services/AdminServices'


const AdminVerticalNav = () => {
  const location = useLocation();
  const navigater = useNavigate()
  const decodedToken = retrieveToken()
  const [user_id, setUser_id] = useState('')
  const [employeeDetails, setEmployeeDetails] = useState([])


  useEffect(() => {
      if(decodedToken){
          const id = decodedToken.id
          setUser_id(id)
      }
      else{
          navigater('/signin')
      }
  }, [])

  useEffect(() => {
    const fetchEmployees = async(user_id) => {
      try{
        const response = await getAllEmployees()
        console.log('emp :', response.data)
        const foundEmployee = response.data.find((employee) => employee.user_Id === user_id)
        setEmployeeDetails(foundEmployee)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchEmployees(user_id)
  }, [user_id])

  console.log('employee ',employeeDetails)

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };
  return (
    <div className='adminVerticalNav'>
      <div className='logo'><img src={logoPic} alt="" /></div>
      <div className="navlinks">
        <div className='profile'>
          <Link className={`profileLink ${isActive('')}`}>
            {/* <FontAwesomeIcon icon={faUser} size='xl'/>  */}
            <div className="image">
                <p>{employeeDetails && typeof employeeDetails === 'object' && employeeDetails.user_name && (employeeDetails.user_name.charAt(0).toUpperCase())}</p>
            </div>
            {employeeDetails && typeof employeeDetails === 'object' && employeeDetails.user_name && (employeeDetails.user_name)}
          </Link>
        </div>
        <div className='links'>
          <Link to='/admindashboard' className={`link ${isActive('/admindashboard')}`}><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
          <Link to='/addworkers' className={`link ${isActive('/addworkers')}`}><FontAwesomeIcon icon={faUserPlus} /> Add Workers</Link>
          <Link to='/booking' className={`link ${isActive('/booking')}`}><FontAwesomeIcon icon={faListCheck} /> BOOKING</Link>
          <Link to='/employeeManagement' className={`link ${isActive('/employeeManagement')}`}><FontAwesomeIcon icon={faUserTie} /> EMPLOYEE MGNT</Link>
          <Link to='/questions' className={`link ${isActive('/questions')}`}><FontAwesomeIcon icon={faBell} /> USER QUESTIONS</Link>
          <Link to='/customerMgt' className={`link ${isActive('/customerMgt')}`}><FontAwesomeIcon icon={faUser} /> CUSTOMER MGNT</Link>
          <Link to='/reviewCheck' className={`link ${isActive('/reviewCheck')}`}><FontAwesomeIcon icon={faComment} /> FEEDBACK MGNT</Link>
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