import FormData from "form-data";
// *** api ***
import axiosServer from '@/api/axiosServer'
// *** shared ***
import readFile from '@/shared/functions/readFormidableFile'


const apiForwardEmail = async (req, res) => {
    if (req.method !== "POST")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const userId = req?.query?.userId

            if (!userId)
                return res.status(400).json({ "code": 400, "message": "Bad request 'userId' is not presented." })
            else {
                const formidableData = await readFile(req)
                const fs = require('fs');

                const fileData = await formidableData;
                const formData = new FormData();


                const files = fileData?.files?.file

                if (Array.isArray(files) && files?.length > 0) {
                    const fileReadStream = fs.createReadStream(files[0]?.filepath)
                    formData.append("file", fileReadStream)
                }

                const axios = axiosServer(req, res)

                const headers = { ...formData.getHeaders() }
                const data = (await axios.post(`/qr/${userId}/QR/file`, formData, { headers })).data

                return res.status(200).json(data)
            }
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}


export const config = { api: { bodyParser: false } };
export default apiForwardEmail