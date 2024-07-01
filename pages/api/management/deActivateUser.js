import axiosServer from '@/api/axiosServer'

const apiActivateUser = async (req, res) => {
    if (req.method !== "POST")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {

        if (!req?.query?.id)
            res.status(400).json({ "code": 405, "message": "Bad request, 'id' is not presented." })
        else {
            try {
                const axios = axiosServer(req, res)
                const data = (await axios.post(`/management/${req?.query?.id}/deActivate`)).data
                return res.status(200).json(data);
            }
            catch (error) {
                res.status(error?.response?.status).json({ error })
            }
        }
    }
}

export default apiActivateUser