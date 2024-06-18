import { Stack, Typography, Button } from '@mui/material'
import { memo } from 'react'
// *** Components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
// *** Icons ***
import QrCode2Icon from '@mui/icons-material/QrCode2';


const GenerateQrCodeItem = memo(({ title, control, controlLabel, onGenerateQR }) => (
  <Stack className='generateQrCodeItem' direction="row" alignItems="center">
    <Typography component="span">{title}</Typography>
    <div className={`control ${control}`}>
      {control === "textfield" && (
        <CustomInput
          placeholder={controlLabel}
          fullWidth
          size="small"
          margin="none"
        />
      )}


      {control === "file" && (
        <CustomInput
          placeholder={controlLabel}
          fullWidth
          size="small"
          margin="none"
        />
      )}

    </div>
    <div className='generate'>
      <QrCode2Icon />
      <Button
        variant='text'
        disableRipple
      >
        Generate
      </Button>
    </div>
  </Stack>
))


GenerateQrCodeItem.displayName = "GenerateQrCodeItem"
function generateNewQRTab() {
  return (
    <div className='generate-new-qr'>

      <GenerateQrCodeItem
        title="WhatsApp"
        control="textfield"
        controlLabel="Enter WhatsApp Number URL"
      // onGenerateQR={}
      />

      {/* <GenerateQrCodeItem
                title="File"
                control=""
                controlLabel=""
                // onGenerateQR={}
            /> */}

      <GenerateQrCodeItem
        title="Mobile Number"
        control="textfield"
        controlLabel="Enter Mobile Number.."
      // onGenerateQR={}
      />

      <GenerateQrCodeItem
        title="URL"
        control="textfield"
        controlLabel="Enter URL here.."
      // onGenerateQR={}
      />

    </div>
  )
}

export default memo(generateNewQRTab)