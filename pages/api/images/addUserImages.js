import FormData from "form-data";
import fetch from 'isomorphic-fetch'
import { getCookie } from 'cookies-next'
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
                const token = getCookie("token", { req, res })

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
                
                const data = (await fetch(`${process.env.BASE_URL}/images/${userId}/add/images?id=${userId}`, {
                    method: "PUT",
                    body: formData,
                    credentials: "include",
                    headers: {
                        ...formData.getHeaders(),
                        Cookie: token
                    }
                })).json()

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