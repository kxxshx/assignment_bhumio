import axios from 'axios'

const BASE_PATH = 'http://localhost:4200'

const getDownloadCSVApi = () => {
    return `${BASE_PATH}/download-sample-csv`;
}

const getExportCSVApi = () => {
    return `${BASE_PATH}/download-csv`
}

const importStocks = (data) => {
    return axios.post(`${BASE_PATH}/stocks`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const deleteStocks = (data) => {
    return axios.delete(`${BASE_PATH}/deleteData`, {
        headers: {
            "Content-Type": "application/json",
        },
        data: {ids: data},
        part : data
    })
}

const updateStocks = (data) => {
    return axios.post(`${BASE_PATH}/updateData`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export default {
    getDownloadCSVApi,
    getExportCSVApi,
    importStocks,
    deleteStocks,
    updateStocks,
}