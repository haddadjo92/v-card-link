import axiosServer from '@/api/axiosServer'

const apiSendUserCredentials = async (req, res) => {
    if (req.method !== "GET")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        const username = req.query.username
        const message = req.query.message

        if (!username || !message)
            return res.status(400).json({ code: 400, message: `Bad request ${(!username && !message) ? "'username' and 'message' are" : !username ? "'username' is" : "'message' is"}  not presented.` })
        else {
            try {
                const axios = axiosServer(req, res)
                const data = (await axios.get(`/management/credentials/${username}`, { params: { message } })).data
                return res.status(200).json(data);
            }
            catch (error) {
                res.status(error?.response?.status).json({ error })
            }
        }
    }
}

export default apiSendUserCredentials

