import axios from 'axios'

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})


export const createAccount = (payload) => api.post(`/users`, payload)
export const getAllAccounts = () => api.get(`/users`)

const apis = {
    createAccount,
    getAllAccounts,
}

export default apis