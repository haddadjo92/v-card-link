import FormData from "form-data";
// *** api ***
import axiosServer from '@/api/axiosServer'
// *** shared ***
import readFile from '@/shared/functions/readFormidableFile'

const apiAddUserImages = async (req, res) => {
    if (req.method !== "PUT")
        return res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        const userId = req?.query?.userId
        if (!userId)
            return res.status(400).json({ "code": 400, "message": "Bad request 'userId' is not presented." })
        else {
            try {
                const formidableData = await readFile(req)
                const fs = require('fs');

                const fileData = await formidableData;
                const formData = new FormData();

                if (Array.isArray(fileData?.files?.imageFile) && fileData?.files?.imageFile?.length > 0) {

                    fileData?.files?.imageFile?.map(imageFile => {
                        const imageReadStream = fs.createReadStream(imageFile?.filepath)
                        formData.append("imageFile", imageReadStream)
                    })
                }

                const headers = { ...formData.getHeaders() }
                const params = { userId: Number(userId) }
                const axios = axiosServer(req, res)
                const data = (await axios.put(`/images/${userId}/add/images`, formData, { headers, params })).data
                return res.status(200).json(data)
            }
            catch (error) {
                return res.status(error?.response?.status).json({ error: error.message })
            }
        }
    }
}


export const config = { api: { bodyParser: false } };
export default apiAddUserImages