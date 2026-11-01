import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate=useNavigate()

    let username=localStorage.getItem("username")
    let role=localStorage.getItem("role")

    let handleLogout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
        navigate("/")
    }
    return (
        <nav>
            <span className='bell'>🔔</span>
            <div className="profile">
                <span>👤</span>        
                <span className='admin-name'>{username+"("+(role==="ADMIN"?"ADMIN":"USER")+")"}</span>
                <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar