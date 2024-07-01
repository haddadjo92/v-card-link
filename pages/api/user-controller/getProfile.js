import axiosServer from '@/api/axiosServer'

const apiGetProfile = async (req, res) => {
    if (req.method !== "GET")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {

        const userId = req?.query?.userId

        if (!userId)
            res.status(400).json({ "code": 400, "message": "Bad request 'userId' is not presented." })
        try {
            const axios = axiosServer(req, res)
            const data = (await axios.get(`/users/${userId}/user/profile`)).data
            return res.status(200).json(data);
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiGetProfile