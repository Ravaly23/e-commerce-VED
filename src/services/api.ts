import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

// ajoute le token automatique à chaque rêquete

api.interceptors.request.use((config) => { // on intercepte la rêquete et on ajoute le token s'il existe 
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`  // on ajoute le token s'il existe 
    }

    return config // on retourne la rêquete modifier 
})

api.interceptors.response.use( // on intercepte la reponse 
    (response) => response, // si status = 200
    (error) => { // si status = 400 .... 500
        if (error.response?.status == 401) {
            localStorage.removeItem('token')
            window.location.href = '/auth'
        }
        return Promise.reject(error) // on retourne l'erreur pour le bloc try/catch 
    }
)

export default api;