import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { Link } from 'react-router-dom';

const CustomerMgt = () => {
    const Customers = [
        { id: 'E001', name: 'John Doe', createdDate:'10th july 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E002', name: 'Cane Smith', createdDate:'12th sep 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E003', name: 'Jane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E004', name: 'Lane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E005', name: 'Pane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' },
        { id: 'E006', name: 'Alice Johnson', createdDate:'15th july 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com' }
    ];

    const [getCustomers, setGetCustomers] = useState([])

    useEffect(() => {
        setGetCustomers(Customers)
    },[])


  return (
    <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container customers'>
            <h1>CUSTOMER MANAGEMENT</h1>
            {
                getCustomers &&
                <div className='details'>
                    {
                        getCustomers.map((customer) => (
                            <div className="row">
                                <p className='col-lg-3 col-md-3 col-3'>{customer.id}</p>
                                <p className='col-lg-3 col-md-3 col-3 name'>{customer.name}</p>
                                <Link to={`/viewCustomer/${customer.id}`} className='btn col-lg-3 col-md-3 col-3 view'>View</Link>
                                <Link className='btn col-lg-3 col-md-3 col-3 delete'>delete</Link>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default CustomerMgt