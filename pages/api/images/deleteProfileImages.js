import axiosServer from '@/api/axiosServer'

const apiDeleteProfileImages = async (req, res) => {
    if (req.method !== "DELETE")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const axios = axiosServer(req, res)
            const data = (await axios.delete("/images/all", { data: req.body })).data
            return res.status(200).json(data);
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiDeleteProfileImages