import { baseUrl } from './config'
import axios from 'axios'

axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error);
});

export default async (url = '', data = {}, type = 'GET',) => {
    if (type === 'GET') {
        return axios.get(baseUrl + url, {
            params: data
        })
    } else {
        return axios({
            method: type,
            url: baseUrl + url,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
}
