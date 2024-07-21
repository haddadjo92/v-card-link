import axiosServer from '@/api/axiosServer'

const apiGetProfile = async (req, res) => {
    if (req.method !== "GET")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {

            const startDate = req?.query?.startDate;
            const endDate = req?.query?.endDate;

            if (!startDate || !endDate)
                return res.status(400).json({ code: 400, message: `Bad request ${(!startDate && !endDate) ? "'startDate' and 'endDate' are" : !startDate ? "'startDate' is" : "'endDate' is"} not presented.` })
            else {
                const axios = axiosServer(req, res)
                const data = (await axios.get("/report/users", { params: { startDate, endDate } })).data
                return res.status(200).json(data);                
            }
        }
        catch (error) {
            return res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiGetProfile