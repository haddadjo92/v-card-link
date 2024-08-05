import FormData from "form-data";
import fetch from 'isomorphic-fetch'
import { getCookie } from 'cookies-next'
// *** shared ***
import readFile from '@/shared/functions/readFormidableFile'

const apiUpdateUserImage = async (req, res) => {
    if (req.method !== "POST")
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

                const imageFile = fileData?.files?.imageFile
                if (Array.isArray(imageFile) && imageFile?.length > 0) {
                    const imageReadStream = fs.createReadStream(imageFile[0]?.filepath)
                    formData.append("image", imageReadStream)
                }

                const data = (await fetch(`${process.env.BASE_URL}/images/${userId}/image?id=${userId}`, {
                    method: "POST",
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
export default apiUpdateUserImage