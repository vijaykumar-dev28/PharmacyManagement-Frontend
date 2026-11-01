import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Medicines = () => {
  let navigate = useNavigate()

  let [searchParam,setSearchParam]=useSearchParams()
  let [statusFilter,setStatusFilter]=useState(searchParam.get("status") || "")

  let [currentPage, setCurrentPage] = useState(1)

  const [medicines, setMedicines] = useState([])
  let [search, setSearch] = useState("")

  let role = localStorage.getItem("role")
  const fetchMedicines = async () => {
    try {
      let token = localStorage.getItem("token")
      console.log(token);
      let response = await axios.get("http://localhost:8080/medicines", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMedicines(response.data)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMedicines()
  }, [])

  let handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token")
      await axios.delete(`http://localhost:8080/medicines/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      fetchMedicines()
    } catch (error) {
      console.log(error);

    }
  }

  let handleEdit = (id) => {
    navigate(`/app/edit-medicine/${id}`)
  }

  // searching

  let filteredMedicines = medicines
  .filter(m =>m.name.toLowerCase().includes(search.toLowerCase()))
  .filter(m=>statusFilter==="" || m.status===statusFilter)

  let itemsPerPage = 10
  let totalPages = Math.ceil(filteredMedicines.length / itemsPerPage)
  let paginated = filteredMedicines.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="medicine">
      <div className="medicine-header">
        <h3>Medicines</h3>
        <p>Manage and track all medicines in your pharmacy</p>
      </div>
      <div className="medicine-middle">
        {
          role === "ADMIN" && <button onClick={() => navigate("/app/add-medicine")}>+ Add Medicine</button>
        }
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="LOW_STOCK">LOW STOCK</option>
          <option value="EXPIRING_SOON">EXPIRING SOON</option>
          <option value="EXPIRED">EXPIRED</option>
        </select>
        <input type="search" placeholder='Search by name ' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="medicine-table" id='medicine-table'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicine Name</th>
              <th>Category</th>
              <th>Manufacturer</th>
              <th>Price(₹)</th>
              <th>Stock Quantity</th>
              <th>Expiry Date</th>
              <th>Supplier</th>
              <th>Status</th>
              {role === "ADMIN" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {
              paginated.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.id}</td>
                  <td>{medicine.name}</td>
                  <td>{medicine.category}</td>
                  <td>{medicine.manufacturer}</td>
                  <td>{medicine.price}</td>
                  <td>{medicine.stockQuantity}</td>
                  <td>{medicine.expiryDate}</td>
                  <td>{medicine.supplierName}</td>
                  <td>
                    <span className={`status-badge status-${medicine.status}`}>
                      {medicine.status}
                    </span>
                  </td>
                  {
                    role === "ADMIN" &&
                    <td>
                      <button className='btn-edit' onClick={() => handleEdit(medicine.id)}>Edit ✏️</button>
                      <button className='btn-delete' onClick={() => handleDelete(medicine.id)}>Delete 🗑️</button>
                    </td>
                  }
                </tr>
              )
              )
            }
          </tbody>
        </table>
        <div className="pagination">
          <span className="page-info">{`Showing ${(currentPage - 1) * itemsPerPage + 1} to ${(currentPage - 1) * itemsPerPage + paginated.length} of ${filteredMedicines.length} transactions`}</span>
          <div className="page-buttons">
            <button className="page-btn" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>‹</button>
            <button className="page-btn active-page">{currentPage}</button>
            <button className="page-btn" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Medicines