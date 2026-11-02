import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllTransactions, getMedicines } from '../service/services'

const Dashboard = () => {

    let navigate=useNavigate()

    let [medicines, setMedicines] = useState([])
    let [totalMedicines, setTotalMedicines] = useState(0)
    let [expiredCount, setExpiredCount] = useState(0)
    let [lowStockCount, setLowStockCount] = useState(0)
    let [expiringSoonCount, setExpiringSoonCount] = useState(0)
    let [recentTransaction, setRecentTransaction] = useState([])

    // let 

    let fetchAll = async () => {
        try {
            let response = await getMedicines()
            let txresponse = await getAllTransactions()
            let txdata = txresponse.data
            setRecentTransaction(txdata.slice(-5).reverse())

            let data = response.data
            // setMedicines(data)
            setTotalMedicines(data.length)
            setExpiredCount(data.filter((m) => m.status === "EXPIRED").length)
            setLowStockCount(data.filter(m => m.status === "LOW_STOCK").length)
            setExpiringSoonCount(data.filter(m => m.status === "EXPIRING_SOON").length)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAll()
    }, [])

    return (
        <div className="dashboard">
            <div className="header">
                <h2>Dashboard</h2>
                <p>Welcome back! Here's an overview of your pharmacy</p>
            </div>
            <div className="boxes">
                <div className="box" onClick={()=>navigate("/app/medicines")} style={{cursor:"pointer"}}>
                    <div className="box-icon">💊</div>
                    <p>total medicine</p>
                    <h2>{totalMedicines}</h2>
                </div>
                <div className="box" onClick={()=>navigate("/app/medicines?status=LOW_STOCK")} style={{cursor:"pointer"}}>
                    <div className="box-icon">⚠️</div>
                    <p>low stock</p>
                    <h2>{lowStockCount}</h2>
                </div>
                <div className="box" onClick={()=>navigate("/app/medicines?status=EXPIRING_SOON")} style={{cursor:"pointer"}}>
                    <div className="box-icon">🕐</div>
                    <p>expiring soon</p>
                    <h2>{expiringSoonCount}</h2>
                </div>
                <div className="box" onClick={()=>navigate("/app/medicines?status=EXPIRED")} style={{cursor:"pointer"}}>
                    <div className="box-icon">❌</div>
                    <p>expired</p>
                    <h2>{expiredCount}</h2>
                </div>
            </div>
            <div className="dashboard-table">
                <div className="table-header">
                    <h1>Recent Transactions</h1>
                    <span>view all</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Medicine Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recentTransaction.map((transaction) => {
                                return (
                                    <tr key={transaction.id}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.medicineName}</td>
                                        <td>
                                            <span className={`status-badge status-${transaction.transactionType}`}>
                                                {transaction.transactionType}
                                            </span>
                                        </td>
                                        <td>{transaction.quantity}</td>
                                        <td>{transaction.transactionDate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Dashboard