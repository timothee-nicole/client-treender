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

    getAllTrees(endpoint) {
        return service  
            .get(endpoint)
            .then(res => res.data)
            .catch(errorHandler)
    }

}