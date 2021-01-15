/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
})

function errorHandler(err) {
    if (err.response.data) {
        console.log(err.response && err.response.data)
        throw err;
    } 
    throw err;
}

export default {
    service,


    // auth
    signup(userInfo) {
        return service  
            .post('/api/auth/signup', userInfo)
            .then(res => res.data)
            .catch(errorHandler)
    },

    signin(userInfo) {
        return service  
            .post('/api/auth/signin', userInfo)
            .then(res => res.data)
            .catch(errorHandler)
    },

    isLoggedIn() {
        return service  
            .get('/api/auth/isLoggedIn')
            .then(res => res.data)
            .catch(errorHandler)
    },

    logOut() {
        return service  
            .get('/api/auth/logout')
            .then(res => res.data)
            .catch(errorHandler)
    }, 


    // Trees
    getAllTrees(endpoint) {
        return service  
            .get(endpoint)
            .then(res => res.data)
            .catch(errorHandler)
    },

    getOneTree(endpoint) {
        return service
            .get(endpoint)
            .then(res => res.data)
            .catch(errorHandler)
    },

    createTree(treeInfo) {
        return service 
            .post('/api/tree/create', treeInfo)
            .then(res => res.data)
            .catch(errorHandler)
    },

    editTree(id, treeInfo) {
        return service
            .patch(`/api/tree/${id}/edit`, treeInfo)
            .then(res => res.data)
            .catch(errorHandler)
    },

    deleteTree(treeInfo) {
        return service  
            .delete('/api/tree/' + treeInfo + '/delete')
            .then(res => res.data)
            .catch(errorHandler)
    },


    // Order
    createOrder(orderInfo) {
        return service
            .post('/api/order/create', orderInfo)
            .then(res => res.data)
            .catch(errorHandler)
    },

    oneOrder(id) {
        return service
            .get('/api/order/' + id)
            .then(res => res.data)
            .catch(errorHandler)
    },

    editOrder(id, orderInfo) {
        return service
            .patch('/api/order/' + id + 'edit', orderInfo)
            .then(res => res.data)
            .catch(errorHandler)
    },

    // User > Edit & delete
    editUser(userInfo) {
        return service
            .patch(`/api/user/edit`, userInfo)
            .then(res => res.data)
            .catch(errorHandler)
    },
    
    getAllUsers() {
        return service
            .get('/api/user/all')
            .then(res => res.data)
            .catch(errorHandler)
    }
}