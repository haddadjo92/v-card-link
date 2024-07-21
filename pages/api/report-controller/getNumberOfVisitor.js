import axiosServer from '@/api/axiosServer'

const apiGetNumberOfVisitor = async (req, res) => {
    if (req.method !== "GET")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {

            const userId = req?.query?.userId;
            const startDate = req?.query?.startDate;
            const endDate = req?.query?.endDate;

            if (!startDate || !endDate || !userId)
                return res.status(400).json({ code: 400, message: `Bad request ${(!startDate && !endDate && !userId) ? "'startDate' and 'endDate' and 'userId' are" : !startDate ? "'startDate' is" : !endDate ? "'endDate' is" : "'userId' is"} not presented.` })
            else {
                const axios = axiosServer(req, res)
                const data = (await axios.get(`/report/visitors/${userId}`, { params: { userId: Number(userId), startDate, endDate } })).data
                return res.status(200).json(data);                
            }
        }
        catch (error) {
            return res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiGetNumberOfVisitor