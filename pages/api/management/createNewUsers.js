import axiosServer from '@/api/axiosServer'

const apiCreateNewUsers = async (req, res) => {
    if (req.method !== "POST")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const axios = axiosServer(req, res)
            const data = (await axios.post("/management/create/users", req?.body)).data
            return res.status(200).json(data);
        }
        catch (error) {
            if(error.response)
                res.status(error?.response?.status).json({ backendMessage: error.response.data })
            else return res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiCreateNewUsers