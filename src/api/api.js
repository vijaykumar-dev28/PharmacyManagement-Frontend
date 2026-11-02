import axios from 'axios'
import React from 'react'

const api = axios.create({
    baseURL:"http://localhost:8080"
})

api.interceptors.request.use((config)=>{
    let token=localStorage.getItem("token")
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})

export default api