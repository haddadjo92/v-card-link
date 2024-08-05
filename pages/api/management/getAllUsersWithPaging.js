import axiosServer from '@/api/axiosServer'

const apiGetAllUsers = async (req, res) => {
    if (req.method !== "GET")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        const pageSize = req.query.pageSize;
        const pageIndex = req.query.pageIndex;
        const searchQuery = req.query.searchQuery || "";

        let URL = `/management/users/paging?pageSize=${pageSize}&pageIndex=${pageIndex}`
        if (searchQuery)
            URL = URL.concat(`&searchKeyword=${searchQuery}`)    

        try {
            const axios = axiosServer(req, res)
            const data = (await axios.get(URL)).data
            return res.status(200).json(data);
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}

export default apiGetAllUsers