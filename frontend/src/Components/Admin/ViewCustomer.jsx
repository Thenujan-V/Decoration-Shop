import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AdminVerticalNav from './AdminVerticalNav';

const ViewCustomer = () => {
    const cust_id = useParams()
    const Customers = [
        { id: 'E001', name: 'John Doe', createdDate:'10th july 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E002', name: 'Cane Smith', createdDate:'12th sep 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E003', name: 'Jane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E004', name: 'Lane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E005', name: 'Pane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E006', name: 'Alice Johnson', createdDate:'15th july 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' }
    ];

    const [getCustomers, setGetCustomers] = useState([])
    const [customers, setCustomers] = useState('')
    useEffect(() => {
        setGetCustomers(Customers)

    },[])
    console.log('ok :',getCustomers)

    const findCustomers = getCustomers.find((customer) => customer.id === cust_id.cust_id)
    useEffect(() => {
        setCustomers(findCustomers)
    })


  return (
    <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container empMgt'>
            <h1>CUSTOMERS MANAGEMENT</h1>
            { customers && 
                <div>
                    <h2>{customers.id}</h2>
                    <div className="details">
                        <div className='detail'>
                            <p className='qes'>NAME</p>
                            <p className='ans'>- {customers.name}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>NIC NO</p>
                            <p className='ans'>- {customers.NIC}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>CONTACT NO</p>
                            <p className='ans'>- {customers.contact_no}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>DATE HIRED</p>
                            <p className='ans'>- {customers.createdDate}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>EMAIL ID</p>
                            <p className='ans'>- {customers.email}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>ADDRESS</p>
                            <p className='ans'>- {customers.email}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>JOB SPECIFICATION</p>
                            <p className='ans'>- {customers.name}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>ACCOUNT DETAILS</p>
                            <p className='ans'>- {customers.name}</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <Link to={`/vieworders/${customers.id}`} className='btn history'>VIEW ORDER HISTORY</Link>
                        <Link to='' className='btn delete'> DELETE PROFILE</Link>
                    </div>
                </div>
                
            }
        </div>
    </div>
  )
}

export default ViewCustomer