import axiosServer from '@/api/axiosServer'

const apiGetQRFileAndDownload = async (req, res) => {
    if (req.method !== "GET")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {

        const userId = req?.query?.userId
        const qrId = req?.query?.qrId

        if (!userId || !qrId)
            return res.status(200).json({ code: 400, message: "Bad request 'userId' and 'qrId' are mandatory fields." })
        else {
            try {
                const axios = axiosServer(req, res)
                const data = (await axios.get(`/visitor/${userId}/qrFile/download`, { params: { userId, qrId } })).data
                return res.status(200).json(data);
            }
            catch (error) {
                res.status(error?.response?.status).json({ error })
            }
        }
    }
}

export default apiGetQRFileAndDownload