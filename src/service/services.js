import api from "../api/api";

// Auth
export const login=(data)=>api.post("/auth/login",data)
export const register=(data)=>api.post("/auth/register",data)
export const registerAdmin=(data)=>api.post("/auth/register-admin",data)

// Medicines
export const getMedicines=()=>api.get("/medicines")
export const getMedicineById=(id)=>api.get(`/medicines/${id}`)
export const addMedicine=(data)=>api.post(`/medicines`,data)
export const deleteMedicine=(id)=>api.delete(`/medicines/${id}`)
export const updateMedicine=(id,data)=>api.put(`/medicines/${id}`,data)

// Suppliers
export const getSupplier=()=>api.get("/suppliers")
export const getSupplierById=(id)=>api.get(`/suppliers/${id}`)
export const addSupplier=(data)=>api.post(`/suppliers`,data)
export const updateSupplier=(id,data)=>api.put(`/suppliers/${id}`,data)
export const deleteSupplier=(id)=>api.delete(`/suppliers/${id}`)

// Stock Transactions
export const addTransaction=(data)=>api.post(`/stock/add`,data)
export const sellTransaction=(data)=>api.post(`/stock/sell`,data)
export const getAllTransactions=()=>api.get("/stock/transactions")
export const getTransactionsById=(id)=>api.get(`/stock/transactions/${id}`)

