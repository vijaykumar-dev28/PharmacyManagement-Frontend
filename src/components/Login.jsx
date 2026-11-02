import React, { use, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { login, register, registerAdmin } from '../service/services'
import { toast } from 'react-toastify'

const Login = () => {

    let location = useLocation()
    let isRegister = location.pathname.includes("register") && !location.pathname.includes("register-admin")
    let isAdmin = location.pathname.includes("register-admin")

    let [users, setUsers] = useState({
        "username": "",
        "password": ""
    })

    let navigate = useNavigate()

    let handleChange = (e) => {
        let { name, value } = e.target
        setUsers({ ...users, [name]: value })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (isAdmin) {
                await registerAdmin(users)
                toast.success("New register as Admin")
                navigate("/login")
            } else if (isRegister) {
                await register(users)
                toast.success("New register as User")
                navigate("/login")
            } else {
                let response = await login(users)
                let data = response.data
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("username", data.username);
                toast.success("Logged in successfully!")
                navigate("/app/dashboard")
            }
        } catch (error) {
            toast.error("Something went wrong!")
            console.log(error);
        }

    }
    return (
        <div className="login">
            <div className="login-card">
                <div className="login-logo">
                    <img src={logo} alt="" style={{width:"100px",height:"100px"}}/>
                </div>
                <h3>Pharmacy Management System</h3>
                <p>Better care.Healthier Tomorrow</p>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username' name='username' onChange={handleChange} value={users.username} />
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} value={users.password} />
                    <button type='submit'>{isAdmin?"Register admin":isRegister ? "Register" : "Login"}</button>
                    {
                        isRegister ?
                            <p>Already have account? <span onClick={() => navigate("/login")}>Login</span></p> :
                            <p>Don't have account? <span onClick={() => navigate("/register")}>Register</span></p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login