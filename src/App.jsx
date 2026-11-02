import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Medicines from './components/Medicines'
import Suppliers from './components/Suppliers'
import StockTransaction from './components/StockTransaction'
import Login from './components/Login'
import AddMedicine from './components/AddMedicine'
import AddSupplier from './components/AddSupplier'
import AddTransaction from './components/AddTransaction'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>

            <Route path='/'>
              <Route index element={<Navigate to="/login"/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Login/>}/>
              <Route path='/app/register-admin' element={<Login/>}/>
            </Route>

            <Route path='/app' element={<ProtectedRoute><Layout/></ProtectedRoute>}>
              <Route index element={<Navigate to="/app/dashboard"/>} />
              <Route path='/app/dashboard' element={<Dashboard />}/>
              <Route path='/app/medicines' element={<Medicines />}/>
              <Route path='/app/add-medicine' element={<AddMedicine/>}/>
              <Route path='/app/edit-medicine/:id' element={<AddMedicine/>}/>
              <Route path='/app/suppliers' element={<Suppliers />}/>
              <Route path='/app/add-suppliers' element={<AddSupplier/>}/>
              <Route path='/app/edit-suppliers/:id' element={<AddSupplier/>}/>
              <Route path='/app/stock-transactions' element={<StockTransaction />}/>
              <Route path='/app/stock-in' element={<AddTransaction/>}/>
              <Route path='/app/stock-out' element={<AddTransaction/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
      <ToastContainer position='top-right' autoClose={800}/>
    </>
  )
}

export default App