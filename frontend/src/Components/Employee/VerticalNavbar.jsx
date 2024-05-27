import React, { useEffect, useState } from 'react'
import { verticalNavbar } from '../Styles'
import { logoPic } from '../Assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faBell, faMoneyBill, faGear, faRightFromBracket, faCircleInfo, faGauge  } from '@fortawesome/free-solid-svg-icons'
import { getEmployeeDetails } from '../../Services/EmployeeService'
import { retrieveToken } from '../../Services/JwtToken'


const VerticalNavbar = () => {
  const location = useLocation();
  const navigater = useNavigate()
  const decodedToken = retrieveToken()
  const [user_id, setUser_id] = useState('')
  const [employeeDetails, setEmployeeDetails] = useState([])


  useEffect(() => {
      if(decodedToken){
          const id = decodedToken.id
          setUser_id(id)

          const userRole = decodedToken.role
          if(userRole === 'user' || userRole === 'employee'){
              navigater('/unauthorized')
          }
      }
      else{
          navigater('/signin')
      }
  }, [])

  useEffect(() => {
    const fetchEmployees = async(user_id) => {
      try{
        const response = await getEmployeeDetails(user_id)
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
    <div className='verticalNav'>
        <div className='logo'><img src={logoPic} alt="" /></div>
        <div className="navLinks">
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
            {/* <Link to='' className={`link ${isActive('/emphome')}`}><FontAwesomeIcon icon={faHouse} /> Home</Link> */}
            <Link to='/empdashboard' className={`link ${isActive('/empdashboard')}`}><FontAwesomeIcon icon={faGauge} /> Dashboard</Link>
            {/* <Link to='' className={`link ${isActive('/empnotification')}`}><FontAwesomeIcon icon={faBell} /> Notifications</Link> */}
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