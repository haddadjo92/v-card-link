// import FormData from "form-data";
// // *** api ***
// import axiosServer from '@/api/axiosServer'
// // *** shared ***
// import readFile from '@/shared/functions/readFormidableFile'

// const apiUpdateQRCode = async (req, res) => {
//     if (req.method !== "PUT")
//         return res.status(405).json({ "code": 405, "message": "Method Not Allowed" })
//     else {
//         const userId = req?.query?.userId

//         if (!userId)
//             return res.status(400).json({ "code": 400, "message": "Bad request 'userId' is not presented." })
//         try {
//             const formidableData = await readFile(req)
//             const fs = require('fs');

//             const fileData = await formidableData;
//             const formData = new FormData();

//             const image = fileData?.files?.image
//             //----------------- fields -----------------
//             const params = {
//                 userId: Number(userId),
//                 name: "QR",
//                 qrCodeUrl: fileData?.fields?.qrCodeUrl?.[0],
//                 high: (fileData?.fields?.high > 0) ? Number(fileData?.fields?.high?.[0]) : 1,
//                 width: (fileData?.fields?.width > 0) ? Number(fileData?.fields?.width?.[0]) : 1,
//                 color: fileData?.fields?.color?.[0],
//                 isImageDeleted: fileData?.fields?.isImageDeleted?.[0] === '1' ? true : false,

//                 // userId: Number(1002),
//                 // name: "QR",
//                 // qrCodeUrl: "http:///localhost:3000/ar/1002",
//                 // high: 100,
//                 // width: 100,
//                 // color: "#FF0000",
//                 // isImageDeleted: false,
//             }


//             const hasImageFile = Array.isArray(image) && image?.length > 0
//             if (hasImageFile) {
//                 const imageReadStream = fs.createReadStream(image[0]?.filepath)
//                 formData.append("imageFile", imageReadStream)
//             } else formData.append("imageFile", null)



//             const headers = { ...formData.getHeaders() }
//             const axios = axiosServer(req, res)
//             const data = (await axios.put(`/social/${userId}/QR/update`, null, { params, headers })).data
//             return res.status(200).json(data)

//         }
//         catch (error) {
//             // res.status(error?.response?.status).json({ error: error.message })
//             res.status(500).json({ error })
//         }
//     }
// }

// export const config = { api: { bodyParser: false } };
// export default apiUpdateQRCode








import FormData from "form-data";
// import fetch from 'isomorphic-fetch'
import fetch from 'isomorphic-unfetch'
import { getCookie } from 'cookies-next'
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
        else {
            try {
                const token = getCookie("token", { req, res })

                const formidableData = await readFile(req)
                const fs = require('fs');

                const fileData = await formidableData;
                const formData = new FormData();

                const image = fileData?.files?.image

                const hasImageFile = Array.isArray(image) && image?.length > 0
                if (hasImageFile) {
                    const imageReadStream = fs.createReadStream(image[0]?.filepath)
                    formData.append("imageFile", imageReadStream)
                }

                const axios = axiosServer(req, res)


                const data = (await axios({
                    method: "PUT",
                    url: `${process.env.BASE_URL}/social/${userId}/QR/update`,
                    data: formData,
                    params: req.query,

                })).data

                return res.status(200).json(data)


                // const searchParams = `userId=${userId}&name=QR&qrCodeUrl=${qrCodeUrl}&high=${high}&width=${width}&color=${color}&isImageDeleted=${isImageDeleted}`                
                // const searchParams = `userId=${params.userId}&name=QR&qrCodeUrl=${params.qrCodeUrl}&high=${params.high}&width=${params.width}&color=${params.color}&isImageDeleted=${params.isImageDeleted}`

                // const searchParams = new URLSearchParams(req.query).toString()


                // const response = (await fetch({
                //     method: "PUT",
                //     url: `${process.env.BASE_URL}/social/${userId}/QR/update`,
                //     searchParams,
                //     body: formData,
                //     credentials: "include",
                //     headers: {
                //         ...formData.getHeaders(),
                //         Cookie: token
                //     }
                // }))

                // const data = await response.json()

                // return res.status(200).json(data)
            }
            catch (error) {
                return res.status(error?.response?.status).json({ error })
            }
        }
    }
}

export const config = { api: { bodyParser: false } };
export default apiUpdateQRCode

