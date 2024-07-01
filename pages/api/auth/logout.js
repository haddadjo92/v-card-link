import axiosServer from '@/api/axiosServer'
import { setCookie } from 'cookies-next'

const apiLogout = async (req, res) => {
    if (req.method !== "DELETE")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const axios = axiosServer(req, res)
            const data = (await axios.delete("/user/logout")).data

            const cookies = req.cookies;
            Object.keys(cookies).forEach(cookieName => {
                setCookie(cookieName, '', { req, res, maxAge: -1, path: '/' });
            });

            return res.status(200).json(data);
        }
        catch (error) {            
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiLogout