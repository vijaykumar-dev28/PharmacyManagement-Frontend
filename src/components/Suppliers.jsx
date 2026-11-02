import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteSupplier, getSupplier } from '../service/services'

const Suppliers = () => {
  let navigate = useNavigate()
  const [suppliers, setSuppliers] = useState([])

  let [search,setSearch]=useState("")

  let [currentPage, setCurrentPage] = useState(1)

  const fetchSuppliers = async () => {
    try {
      let response = await getSupplier()
      setSuppliers(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSuppliers()
  }, [])

  let handleEdit = (id) => {
    navigate(`/app/edit-suppliers/${id}`)
  }

  let handleDelete = async (id) => {
    try {
      await deleteSupplier(id)
      fetchSuppliers()
    } catch (error) {
      console.log(error);

    }
  }

  let filteredSuppliers=suppliers.filter((m)=>{
      return m.name.toLowerCase().includes(search.toLowerCase())
  })

  let itemsPerPage = 10
  let totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage)
  let paginated = filteredSuppliers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="medicine">
      <div className="medicine-header">
        <h3>Suppliers</h3>
        <p>Manage and view all your suppliers</p>
      </div>
      <div className="medicine-middle">
        <button onClick={() => { navigate("/app/add-suppliers") }}>+ Add Supplier</button>
        <input type="search" placeholder='Search by name..' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div className="medicine-table" id='supllier-table'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Suppliers Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              paginated.length > 0 ? paginated.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.contactNumber}</td>
                  <td>{supplier.email}</td>
                  <td>
                    <button className='btn-edit' onClick={() => handleEdit(supplier.id)}>Edit ✏️ ✏️</button>
                    <button className='btn-delete' onClick={() => handleDelete(supplier.id)}>Delete 🗑️</button>
                  </td>
                </tr>
              )
              )
                : (
                  <tr>
                    <td colSpan="5">No data yet</td>
                  </tr>
                )
            }
          </tbody>
        </table>
        <div className="pagination">
          <span className="page-info">{`Showing ${(currentPage-1)*itemsPerPage+1} to ${(currentPage-1)*itemsPerPage+paginated.length} of ${filteredSuppliers.length} transactions`}</span>
          <div className="page-buttons">
            <button className="page-btn" onClick={()=>setCurrentPage(prev => Math.max(prev-1, 1))}>‹</button>
            <button className="page-btn active-page">{currentPage}</button>
            <button className="page-btn" onClick={()=>setCurrentPage(prev => Math.min(prev+1, totalPages))}>›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suppliers