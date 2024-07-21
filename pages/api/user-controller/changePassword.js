import axiosServer from '@/api/axiosServer'

const apiGetProfile = async (req, res) => {
    if (req.method !== "PATCH")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const axios = axiosServer(req, res)
            const data = (await axios.patch(`/users/change/password`, req.body)).data
            return res.status(200).json(data);
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiGetProfile