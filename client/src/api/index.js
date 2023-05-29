import axios from 'axios'

axios.defaults.withCredentials = true;

const api = axios.create({
    //change this later
    baseURL: process.env.REACT_APP_BACKEND_API_URL,
})

// auth
export const registerUser = (payload) => api.post(`auth/register/`, payload)
export const loginUser = (payload) => api.post(`auth/login/`, payload)
export const getLoggedIn = () => api.get(`auth/loggedIn/`)
export const logoutUser = () => api.get(`auth/logout/`)
export const deleteUser = (id) => api.delete(`auth/user/${id}`)
export const updateUser = (id, payload) => api.put(`auth/user/${id}`, payload)

//export const getAdmin = (id) => api.get(`auth/role/${id}`)

//product
export const createProduct = (payload) => api.post(`products/`, payload)
export const getProducts = (payload) => api.get('products', { params: payload });
export const getProductById = (id) => api.get(`products/${id}`)
export const updateProduct = (id, payload) => api.put(`products/${id}`, payload)
export const deleteProduct = (id) => api.delete(`products/${id}`)

//cart
export const createCart = (payload) => api.post(`cart/`, payload)
export const getUserCart = (id) => api.get(`cart/${id}`)
export const updateCart = (id, payload) => api.put(`cart/${id}`, payload)

//order
export const createOrder = (payload) => api.post(`order/`, payload)
export const getUserOrder = (id) => api.get(`order/${id}`)
export const updateOrder = (id, payload) => api.put(`order/${id}`, payload)
export const deleteOrder = (id) => api.delete(`order/${id}`)

export const checkout = (payload) => api.post(`checkout/payment/`, payload)


const apis = {
    registerUser,
    loginUser,
    getLoggedIn,
    logoutUser,
    deleteUser,
    updateUser,
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createCart,
    getUserCart,
    updateCart,
    createOrder,
    getUserOrder,
    updateOrder,
    deleteOrder,
    checkout
}

export default apis