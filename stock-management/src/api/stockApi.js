import axios from 'axios'

const BASE_PATH = 'http://localhost:4200'

const getStocks = () => {
    return axios.get(`${BASE_PATH}/getData`);
}

export default {
    getStocks
}