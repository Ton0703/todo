import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:3030',
    timeout: 10000
})

export default service