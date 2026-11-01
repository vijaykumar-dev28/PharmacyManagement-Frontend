import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const Sidebar = () => {

    let role=localStorage.getItem("role")

    return (
        <div className="sidebar">
            <div className='sidebar-logo'>
                <img src={logo} alt="logo-image"  style={{width: "48px", height: "48px"}}/>
                <h3>Pharmacy</h3>
                <p>Management System</p>
            </div>
            <div className="sidebar-links">
                <NavLink to={"/app/dashboard"}>Dashboard</NavLink>
                <NavLink to={"/app/medicines"}>Medicines</NavLink>
                {role==="ADMIN" && <NavLink to={"/app/suppliers"}>Suppliers</NavLink>}
                <NavLink to={"/app/stock-transactions"}>Stock Transactions</NavLink>
                {role=="ADMIN" && <NavLink to={"/register-admin"}>Register Admin</NavLink>}
            </div>
        </div>
    )
}

export default Sidebar