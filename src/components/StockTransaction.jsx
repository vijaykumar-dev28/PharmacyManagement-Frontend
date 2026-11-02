import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllTransactions } from '../service/services'

const StockTransaction = () => {

  let navigate = useNavigate()

  let [stockTransactions, setStockTransactions] = useState([])

  let [currentPage, setCurrentPage] = useState(1)

  let [filterType, setFilterType] = useState("")
  let [startDate, setStartDate] = useState("")
  let [endDate, setEndDate] = useState("")

  let fetchTransactions = async () => {
    try {
      let response = await getAllTransactions()

      setStockTransactions((response.data).reverse())
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  let filtered = stockTransactions
    .filter(s => filterType === "" || s.transactionType === filterType)
    .filter(s => startDate === "" || s.transactionDate >= startDate)
    .filter(s => endDate === "" || s.transactionDate <= endDate)

  let handleReset = () => {
    setFilterType("")
    setStartDate("")
    setEndDate("")
    setCurrentPage(1)
  }

  let itemsPerPage = 10
  let totalPages = Math.ceil(filtered.length / itemsPerPage)
  let paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  return (
    <div className="stockTransaction">
      <div className="medicine-header">
        <h3>Stock Transactions</h3>
        <p>View and manage all stock in and out transactions</p>
      </div>
      <div className="stock-btn">
        <button className='btn-stock-in' onClick={() => navigate("/app/stock-in")}>+ Stock IN</button>
        <button className='btn-stock-out' onClick={() => navigate("/app/stock-out")}>- Stock OUT</button>
      </div>
      <div className="transaction-filters">
        <div className="trans-date">
          <div className="filter-group">
            <label>Transaction Type</label>
            <select name="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-range-box">
              <input type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <span>-</span>
              <input type="date" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>

        <button className="btn-reset" onClick={handleReset}>↺ Reset</button>
      </div>
      <div className="medicine-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicne Name</th>
              <th>Transaction Type</th>
              <th>Quantity</th>
              <th>Transaction Date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {
              paginated.length > 0 ? paginated.map((stock) => {
                return (
                  <tr key={stock.id}>
                    <td>{"STK" + String(stock.id).padStart(3, '0')}</td>
                    <td>{stock.medicineName}</td>
                    <td>
                      <span className={`status-badge status-${stock.transactionType}`}>
                        {stock.transactionType}
                      </span>
                    </td>
                    <td>{stock.quantity}</td>
                    <td>{stock.transactionDate}</td>
                    <td>{stock.reason}</td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan="6">No data yet</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <div className="pagination">
          <span className="page-info">{`Showing ${(currentPage-1)*itemsPerPage+1} to ${(currentPage-1)*itemsPerPage+paginated.length} of ${filtered.length} transactions`}</span>
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

export default StockTransaction