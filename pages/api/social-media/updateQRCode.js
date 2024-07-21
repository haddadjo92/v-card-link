import FormData from "form-data";
// *** api ***
import axiosServer from '@/api/axiosServer'
// *** shared ***
import readFile from '@/shared/functions/readFormidableFile'

const apiUpdateQRCode = async (req, res) => {    
    if (req.method !== "PUT")
        return res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
    else {        
        const userId = req?.query?.userId

        if (!userId)
            return res.status(400).json({ "code": 400, "message": "Bad request 'userId' is not presented." })
        try {
            const formidableData = await readFile(req)
            const fs = require('fs');

            const fileData = await formidableData;
            const formData = new FormData();

            const image = fileData?.files?.image
            //----------------- fields -----------------
            const params = {
                name: fileData?.fields?.name[0],
                qrCodeUrl: fileData?.fields?.qrCodeUrl[0],                
                high: (fileData?.fields?.high > 0) ? Number(fileData?.fields?.high[0]) : "",
                width: (fileData?.fields?.width > 0) ? Number(fileData?.fields?.width[0]) : "",
                color: fileData?.fields?.color[0],
            }


            if (Array.isArray(image) && image?.length > 0) {
                const imageReadStream = fs.createReadStream(image[0]?.filepath)
                formData.append("image", imageReadStream)
            } else formData.append("image", "")

            const headers = { ...formData.getHeaders() }            
            const axios = axiosServer(req, res)
            const data = (await axios.put(`/social/${userId}/QR/update`, formData, { headers, params })).data
            return res.status(200).json(data)
        }
        catch (error) {
            res.status(error?.response?.status).json({ error: error.message })
        }
    }
}

export const config = { api: { bodyParser: false } };
export default apiUpdateQRCode