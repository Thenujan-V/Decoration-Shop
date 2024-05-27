import React, { useState, useEffect } from 'react';
import { userProfile } from '../Components/Styles';
import Navbar from '../Components/Navbar';
import { getUserDetails } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { retrieveToken } from '../Services/JwtToken';

const UserProfile = () => {
    const navigater = useNavigate()
    const decodedToken = retrieveToken()
    const [user_Id, setUser_Id] = useState('')

    useEffect(() => {
        if(decodedToken){
            const id = decodedToken.id
            setUser_Id(id)

            const userRole = decodedToken.role
            if(userRole === 'admin' || userRole === 'employee'){
                navigater('/unauthorized')
              }
        }
        else{
            setUser_Id('')
        }
    }, [])

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    mail_id: '',
    contact_no: '',
    adress: '',
  });

  useEffect(() => {
    const fetchUserDetails = async (user_Id) => {
      try{
        const response = await getUserDetails(user_Id);
        console.log('res :', response.data)
        setUser(response.data[0]);
      }
      catch(error){
        console.log('error occur :', error)
      }
    };

    fetchUserDetails(user_Id);
  }, [user_Id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    // Logic to save the user profile details
    console.log('User profile saved', user);
  };

  const handleChangePassword = () => {
    // Logic to change the password
    console.log('Change password clicked');
  };

  const handleLogout = () => {
    // Logic to log out the user
    console.log('Logout clicked');
  };

  const handleDeleteAccount = () => {
    // Logic to delete the account
    console.log('Delete account clicked');
  };
  console.log('uuuuuu :', user)

  return (
    <>
        <Navbar />
        <div className="profile-container">
        <div className="profile-header">
            <div className="profile-photo">
            {user.first_name.charAt(0).toLocaleUpperCase()}
            </div>
            <h1>{user.first_name} {user.last_name}</h1>
        </div>
        <div className="profile-details">
            <label>
            First Name:
            <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />
            </label>
            <label>
            Last Name:
            <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />
            </label>
            <label>
            Email:
            <input type="mail_id" name="mail_id" value={user.mail_id} onChange={handleChange} />
            </label>
            <label>
            Address:
            <input type="text" name="adress" value={user.adress} onChange={handleChange} />
            </label>
            <label>
            Phone Number:
            <input type="tel" name="contact_no" value={user.contact_no} onChange={handleChange} />
            </label>
            <button onClick={handleSave}>Save Changes</button>
            <button className='logout' onClick={handleLogout}>Log Out</button>
            <button style={{backgroundColor:'red'}} onClick={handleDeleteAccount}>Delete Account</button>
        </div>
        <div className="profile-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/help-center">Help Center</a>
        </div>
        </div>
    </>
  );
};

export default UserProfile;
