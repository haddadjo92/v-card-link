import axiosServer from '@/api/axiosServer'

const apiRetrieveUserTemplateDesign = async (req, res) => {
    if (req.method !== "GET")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const userId = req?.query?.userId

            if (!userId)
                res.status(400).json({ code: 400, message: "Bad request, 'userId' is not presented." })
            else {
                const axios = axiosServer(req, res)
                const data = (await axios.get(`/social/${userId}/template`)).data
                return res.status(200).json(data);
            }
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiRetrieveUserTemplateDesign