import React from 'react'
import AdminVerticalNav from './AdminVerticalNav'

const Dashboard = () => {
  return (
    <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}}>
            <div className="container adminDashboard">
                <div className="row boxes">
                    <div className="col-lg-6">
                        <div className='orders'>
                            <p>new orders</p>
                            <p>07</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='delivery'>
                            <p>to deliver</p>
                            <p>05</p>
                        </div>
                    </div>
                </div>
                
                <div className="row table">
                    <div className='row edit'>
                        <p className='col-lg-6'>SERVICE LIST</p>
                        <button className='col-lg-6'>EDIT</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>Service Id</td>
                                <td>Service Name</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>s001</td>
                                <td>NAME NAME</td>
                                <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, nam!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard