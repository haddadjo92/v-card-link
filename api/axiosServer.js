import axios from 'axios'
import { getCookie } from 'cookies-next'


function axiosServer(req, res) {
    const token = getCookie("token", { req, res })

    return axios.create({
        baseURL: process.env.BASE_URL,
        withCredentials: true,
        headers: {
            ...req.headers,
            Cookie: token
        }
    })

}

export default axiosServer