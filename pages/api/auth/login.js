import axios from 'axios'

const apiLogin = async (req, res) => {
    if (req.method !== "POST")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const headers = { "Content-type": "application/json" }
            const apiResponse = (await axios.post(`${process.env.BASE_URL}/user/login`, req.body, { headers, withCredentials: true }))

            const apiData = await apiResponse.data;
            const apiHeaders = await apiResponse.headers;

            return res.status(200).json({ userInfo: apiData, token: apiHeaders?.["set-cookie"][0] });
        }
        catch (error) {
            return res.status(500).json({ error: error?.message })
        }
    }
}

export default apiLogin