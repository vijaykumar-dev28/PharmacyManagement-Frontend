import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addSupplier, getSupplierById, updateSupplier } from '../service/services'
import { toast } from 'react-toastify'

const AddSupplier = () => {

    let navigate = useNavigate()

    let { id } = useParams()
    let isEditMode = id !== undefined;
    let [supplier, setSupplier] = useState({
        "name": "",
        "contactNumber": "",
        "email": ""
    })

    let fetchSupplier = async () => {
        if (!isEditMode) return
        try {
            let response = await getSupplierById(id)
            let data = response.data
            setSupplier({
                name: data.name,
                contactNumber: data.contactNumber,
                email: data.email
            })
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchSupplier()
    }, [])

    let handleChange = (e) => {
        let { name, value } = e.target
        setSupplier({ ...supplier, [name]: value })
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isEditMode) {
                await updateSupplier(id,supplier)
                toast.success("Supplier updated!")
            } else {
                await addSupplier(supplier)
                toast.success("Supplier added!")
            }
            navigate("/app/suppliers")
        } catch (error) {
            toast.error("Something wrong!")
            console.log(error);
        }
    }

    return (
        <div className="addMedicine" id='addMedicine'>
            <button onClick={() => navigate("/app/suppliers")}>⬅️Back to Supplier</button>
            <div className="form-area">
                <div className="form-head">
                    <div className="form-head-logo">
                        <span>💊</span>
                    </div>
                    <div className="form-head-content">
                        <h2>{isEditMode ? "Edit Supplier" : "Add Supplier"}</h2>
                        <p>{isEditMode ? "Change the details below to edit supplier to the system" : "Enter the details below to add a new supplier to the system"}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Supplier Name</label>
                        <input type="text" name='name' value={supplier.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Contact number</label>
                        <input type="number" name='contactNumber' value={supplier.contactNumber} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name='email' value={supplier.email} onChange={handleChange} />
                    </div>

                    <div className="form-buttons">
                        <button className='btn-cancel' onClick={() => navigate("/app/suppliers")}>Cancel</button>
                        <button type='submit' className='btn-submit'>{isEditMode ? "Update" : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSupplier