import FormData from "form-data";
import fetch from 'isomorphic-fetch'
import { getCookie } from 'cookies-next'
// *** shared ***
import readFile from '@/shared/functions/readFormidableFile'


const apiUpdateQRFile = async (req, res) => {
    if (req.method !== "POST")
        res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {
        try {
            const userId = req?.query?.userId

            if (!userId)
                return res.status(400).json({ "code": 400, "message": "Bad request 'userId' is not presented." })
            else {
                const token = getCookie("token", { req, res })

                const formidableData = await readFile(req)
                const fs = require('fs');

                const fileData = await formidableData;
                const formData = new FormData();


                const files = fileData?.files?.file

                if (Array.isArray(files) && files?.length > 0) {
                    const fileReadStream = fs.createReadStream(files[0]?.filepath)
                    formData.append("file", fileReadStream)
                }

                
                                                                   
                const data = (await fetch(`${process.env.BASE_URL}/qr/${userId}/QR/file`, {
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
        }
        catch (error) {
            res.status(error?.response?.status).json({ error })
        }
    }
}


export const config = { api: { bodyParser: false } };
export default apiUpdateQRFile