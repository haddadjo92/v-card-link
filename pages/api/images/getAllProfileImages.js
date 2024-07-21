import axiosServer from '@/api/axiosServer'

const apiGetAllProfileImages = async (req, res) => {
    if (req.method !== "GET")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const id = req?.query?.id

            if (!id)
                res.status(400).json({ code: 400, message: "Bad request, 'id' is not presented." })
            else {
                const axios = axiosServer(req, res)
                const data = (await axios.get(`/images/${id}/all/images64`)).data
                return res.status(200).json(data);
            }
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiGetAllProfileImages