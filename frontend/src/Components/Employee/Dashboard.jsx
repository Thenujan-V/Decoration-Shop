import React from 'react'
import { dashboard } from '../Styles'
import VerticalNavbar from './VerticalNavbar'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div style={{display:'flex', height:'100vh'}}>
        <VerticalNavbar />
        <div style={{flex:1}}>
            <div className='container dashboard'>
                <div className="pending_works">
                    <h2>pending works</h2>
                        <div className="row work">
                            <div className="col-lg-8">
                                <p className='p-0 m-0'>order id 1123</p>
                                <p className='status'>Started Working</p>
                            </div>
                            <div className="col-lg-4">
                                <Link className='link'>View</Link>
                            </div>
                        </div>
                        <div className="row work">
                            <div className="col-lg-8">
                                <p className='p-0 m-0'>order id </p>
                                <p className='status'>Started Working</p>
                            </div>
                            <div className="col-lg-4">
                                <Link className='link'>View</Link>
                            </div>
                        </div>
                        <div className="row work">
                            <div className="col-lg-8">
                                <p className='p-0 m-0'>order id </p>
                                <p className='status'>Started Working</p>
                            </div>
                            <div className="col-lg-4">
                                <Link className='link'>View</Link>
                            </div>
                        </div>
                </div>
                <div className="order_req">
                    <h2>Order Requests</h2>
                    <div className="row work">
                        <div className="col-lg-8">
                            <p className='p-0 m-0'>order id 2345</p>
                        </div>
                        <div className="col-lg-4">
                            <Link className='link'>View</Link>
                        </div>
                    </div>
                    <div className="row work">
                        <div className="col-lg-8">
                            <p className='p-0 m-0'>order id 1235</p>
                        </div>
                        <div className="col-lg-4">
                            <Link className='link'>View</Link>
                        </div>
                    </div>
                    
                </div>
                <div className="complete_works">
                    <h2>Completed Works</h2>
                    <div className="row work">
                        <div className="col-lg-8">
                            <p className='p-0 m-0'>order id 2233</p>
                        </div>
                        <div className="col-lg-4">
                            <Link className='link'>View</Link>
                        </div>
                    </div>
                    <div className="row work">
                        <div className="col-lg-8">
                            <p className='p-0 m-0'>order id 1234</p>
                        </div>
                        <div className="col-lg-4">
                            <Link className='link'>View</Link>
                        </div>
                    </div>
                    <div className="row work">
                        <div className="col-lg-8">
                            <p className='p-0 m-0'>order id 1122</p>
                        </div>
                        <div className="col-lg-4">
                            <Link className='link'>View</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container other">
                <div className='earnings '>
                    <h1>Total Earnings</h1>
                    <p>30,000 LKR</p>
                </div>
                <div className='totalOrders'>
                    <h1>Total Completed Orders</h1>
                    <p>45</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard