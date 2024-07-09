import axiosServer from '@/api/axiosServer'

const apiUpdateUserSocialMedia = async (req, res) => {
    if (req.method !== "PUT")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {

        const userId = req?.query?.userId

        if (!userId)
            res.status(400).json({ "code": 400, "message": "Bad request 'userId' is not presented." })
        try {
            const axios = axiosServer(req, res)
            const data = (await axios.put(`/social/${userId}/social/update`, req.body)).data
            return res.status(200).json(data);
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiUpdateUserSocialMedia