import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddMedicine = () => {

    let navigate = useNavigate()
    let { id } = useParams()

    let isEditMode = id !== undefined;

    let [medicine, setMedicine] = useState({
        "name": "",
        "category": "",
        "manufacturer": "",
        "price": "",
        "expiryDate": "",
        "supplierId": ""
    })

    let [supplier, setSupplier] = useState([])

    let fetchMedicine = async () => {
        if (!isEditMode) return
        let token = localStorage.getItem("token")

        let response = await axios.get(`http://localhost:8080/medicines/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        let data = response.data
        setMedicine({
            name: data.name,
            category: data.category,
            manufacturer: data.manufacturer,
            price: data.price,
            expiryDate: data.expiryDate,
            supplierId: data.supplierId
        })
    }
    let fetchSuppliers = async () => {
        let token = localStorage.getItem("token")
        let response = await axios.get("http://localhost:8080/suppliers", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSupplier(response.data)
    }
    useEffect(() => {
        fetchMedicine()
        fetchSuppliers()
    }, [])

    let handleChange = (e) => {
        let { name, value } = e.target
        setMedicine({ ...medicine, [name]: value })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem("token")

            if (isEditMode) {
                await axios.put(`http://localhost:8080/medicines/${id}`, medicine, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } else {
                await axios.post("http://localhost:8080/medicines", medicine, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            navigate("/app/medicines")
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="addMedicine">
            <button onClick={() => navigate("/app/medicines")}>⬅️Back to Medicines</button>
            <div className="form-area">
                <div className="form-head">
                    <div className="form-head-logo">
                        <span>💊</span>
                    </div>
                    <div className="form-head-content">
                        <h2>{isEditMode ? "Edit Medicine" : "Add Medicine"}</h2>
                        <p>{isEditMode ? "Change the details below to edit medicine to the system" : "Enter the details below to add a new medicine to the system"}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Medicine Name</label>
                    <input type="text" name="name" value={medicine.name} onChange={handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label>Category</label>
                    <select name="category" value={medicine.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="ANTIBIOTIC">ANTIBIOTIC</option>
                        <option value="PAINKILLER">PAINKILLER</option>
                        <option value="VITAMIN">VITAMIN</option>
                        <option value="ANTACID">ANTACID</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <label>Manufacturer</label>
                    <input type="text" name="manufacturer" value={medicine.manufacturer} onChange={handleChange} />    
                    </div>
                    
                    <div className="form-group">
                        <label>Price</label>
                    <input type="number" name="price" value={medicine.price} onChange={handleChange} />
                    </div>

                    

                    <div className="form-group">
                        <label>Expiry Date</label>
                    <input type="date" name="expiryDate" value={medicine.expiryDate} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Supplier</label>
                    <select name="supplierId" value={medicine.supplierId} onChange={handleChange}>
                        <option value="">Select Supplier</option>
                        {
                            supplier.map((s) => {
                                return (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                )
                            })
                        }
                    </select>
                    </div>
                    
                    <div className="form-buttons">
                        <button type='button' className='btn-cancel' onClick={() => navigate("/app/medicines")}>Cancel</button>
                        <button type='submit' className='btn-submit'>{isEditMode ? "Update" : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMedicine