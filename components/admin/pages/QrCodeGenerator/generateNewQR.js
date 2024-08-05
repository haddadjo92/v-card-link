import { Stack, Typography, Button } from '@mui/material'
import { memo, useState, useCallback } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
// *** redux ***
import { useSelector } from 'react-redux'
// *** Components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomFileUpload from '@/components/common/FormFields/CustomFileUpload'
// *** Icons ***
import QrCode2Icon from '@mui/icons-material/QrCode2';


const GenerateQrCodeItem = memo(({ name, title, control, controlLabel, value, generateQR, onChange, onGenerateQR }) => (
  <Stack className='generateQrCodeItem' direction="row" alignItems="center">
    <Typography component="span">{title}</Typography>
    <div className={`control ${control}`}>
      {control === "textfield" && (
        <CustomInput
          name={name}
          placeholder={controlLabel}
          fullWidth
          size="small"
          margin="none"
          disabled={generateQR}
          value={value}
          onChange={onChange}
        />
      )}


      {control === "file" && (
        <CustomFileUpload
          margin="none"
          disabled={generateQR}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}

    </div>
    <div className='generate'>
      <QrCode2Icon />
      <Button
        data-name={name}
        data-title={title}
        variant='text'
        disableRipple
        disabled={generateQR || !value}
        onClick={onGenerateQR}
      >
        Generate
      </Button>
    </div>
  </Stack>
))


const valuesInitialState = {
  whatsAppNumber: "",
  file: "",
  mobileNumber: "",
  url: ""
}

const generateQRInitialState = {
  whatsAppNumber: false,
  file: false,
  mobileNumber: false,
  url: false
}

GenerateQrCodeItem.displayName = "GenerateQrCodeItem"
function GenerateNewQRTab() {
  const [values, setValues] = useState(valuesInitialState)
  const [generateQR, setGenerateQR] = useState(generateQRInitialState)

  const authState = useSelector(state => state.auth)
  const userId = authState?.session?.id;

  // ****************** Callbacks ******************
  const handleChange = useCallback((event) => {

    setValues(prevState => {

      if (event.target.name === "file-upload-field") return { ...prevState, "file": event.target.files[0] }

      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }, [])


  const handleGenerateQR = useCallback((event) => {
    const name = event.target.getAttribute("data-name")
    const title = event.target.getAttribute("data-title")
    const value = values[name]

    setGenerateQR(prevState => ({ ...prevState, [name]: true }))    

    let promise;
    if (name === "file") {

      const headers = { "Content-type": "multipart/form-data" }
      const formData = new FormData()

      formData.append("file", values.file)
      promise = axios.post(`/api/qr-generator/updateQRCodeFile?userId=${userId}`, formData, { headers })
    }
    else {
      promise = axios.post(`/api/qr-generator/createQRCode?userId=${userId}`, { userId: Number(userId), fieldName: name, fieldValue: value })
    }

    // const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));    


    toast.promise(promise, {
      pending: `Generating QR for ${title}`,
      success: `QR for ${title} was successfully generated ✅`,
      error: `Fail to generate QR for ${title} ⛔️`,
    }, { position: "bottom-left", theme: "dark" })
      .finally(() => setGenerateQR(prevState => ({ ...prevState, [name]: false })))

    promise.then(() => setValues(prevState => ({ ...prevState, [name]: "" })))

    promise.catch(error => {
      console.log("error: ", error);
    })

  }, [userId, values])



  return (
    <div className='generate-new-qr'>

      <GenerateQrCodeItem
        name="whatsAppNumber"
        title="WhatsApp"
        control="textfield"
        controlLabel="Enter WhatsApp Number URL"
        generateQR={generateQR.whatsAppNumber}
        value={values.whatsAppNumber}
        onChange={handleChange}
        onGenerateQR={handleGenerateQR}
      />

      <GenerateQrCodeItem
        name="file"
        title="file"
        control="file"
        generateQR={generateQR.file}
        value={values.file}
        onChange={handleChange}
        onGenerateQR={handleGenerateQR}
      />

      <GenerateQrCodeItem
        name="mobileNumber"
        title="Mobile Number"
        control="textfield"
        controlLabel="Enter Mobile Number.."
        generateQR={generateQR.mobileNumber}
        value={values.mobileNumber}
        onChange={handleChange}
        onGenerateQR={handleGenerateQR}
      />

      <GenerateQrCodeItem
        name="url"
        title="URL"
        control="textfield"
        controlLabel="Enter URL here.."
        generateQR={generateQR.url}
        value={values.url}
        onChange={handleChange}
        onGenerateQR={handleGenerateQR}
      />

    </div>
  )
}

export default memo(GenerateNewQRTab)