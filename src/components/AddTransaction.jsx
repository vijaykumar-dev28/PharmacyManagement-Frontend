import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AddTransaction = () => {

    let navigate=useNavigate()

    let [transaction,setTransaction]=useState({
        "medicineId":"",
        "quantity":"",
        "reason":""
    })

    let [medicines,setMedicines]=useState([])

    let location=useLocation()

    let isStockIn=location.pathname.includes("stock-in");

    let fetchMedicines=async()=>{
        try {
            let token=localStorage.getItem("token")
            let response=await axios.get("http://localhost:8080/medicines",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setMedicines(response.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchMedicines()
    },[])

    let handleChange=(e)=>{
        let {name,value}=e.target
        setTransaction({...transaction,[name]:value})
    }

    let handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            let token=localStorage.getItem("token")
            if(isStockIn){
                await axios.post("http://localhost:8080/stock/add",transaction,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            }else{
                await axios.post("http://localhost:8080/stock/sell",transaction,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            }
            navigate("/app/stock-transactions")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="addMedicine">
            <button onClick={() => navigate("/app/stock-transactions")}>⬅️Back to Stock Transactions</button>
            <div className="form-area">
                <div className="form-head">
                    <div className="form-head-logo">
                        <span>💊</span>
                    </div>
                    <div className="form-head-content">
                        <h2>{isStockIn ? "Stock IN" : "Stock OUT"}</h2>
                        <p>{isStockIn ? "Enter the details below to add a transaction" : "Enter the details below to sell a transaction to the system"}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Medicine Name</label>
                        <select name="medicineId" value={transaction.medicineId} onChange={handleChange} >
                            <option value="">Select Medicine</option>
                            {
                                medicines.map((m)=>{
                                    return(
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="number" name='quantity' value={transaction.quantity} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Reason</label>
                        <input type="text" name='reason' value={transaction.reason} onChange={handleChange} />
                    </div>

                    <div className="form-buttons">
                        <button className='btn-cancel' onClick={() => navigate("/app/stock-transactions")}>Cancel</button>
                        <button type='submit' className='btn-submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTransaction