import axiosServer from '@/api/axiosServer'

const apiUpdateUserProfile = async (req, res) => {
    if (req.method !== "PUT")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {

        const id = req?.query?.id

        if (!id)
            res.status(400).json({ "code": 400, "message": "Bad request 'id' is not presented." })
        try {
            const axios = axiosServer(req, res)
            const data = (await axios.put(`/users/${id}/update`, req.body)).data
            return res.status(200).json(data);
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiUpdateUserProfile