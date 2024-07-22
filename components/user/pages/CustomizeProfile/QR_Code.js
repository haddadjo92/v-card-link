import dynamic from 'next/dynamic'
import { memo } from 'react'
import { Fade, Typography, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material'
import { QRCode } from 'react-qrcode-logo';
// *** redux ***
import { useSelector } from 'react-redux'
// *** components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomFileUpload from '@/components/common/FormFields/CustomFileUpload'
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** dynamic imports ***
const ChromeColorPicker = dynamic(() => import('@uiw/react-color').then(({ Chrome }) => Chrome), { ssr: false })
// *** Icons ***
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
// *** styles ***
import styles from '@/assets/styles/__pages/user/customizeQR.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)


function QRCodeTab({ qrColor, qrImage, qrImageFile, qrImageDimensions, onQRColorChange, onQrImageDimensionsChange, onQRImageChange, onRemoveQRImage, onSaveQRCodeTab }) {
  console.log("qrImage: ", qrImage);
  const classes = useStyles()
  
  const authState = useSelector(state => state.auth)
  const userId = authState?.session?.id;

  return (
    <section className={classes.customizeQR}>

      <Typography component='h1'>Customize Your QR Code</Typography>

      <div className='inner-content'>
        <Grid container>
          <Grid item md={3}>
            <section className='left-section'>

              <div className='qr-code-wrapper'>
                <div className='content'>
                  <div className='qr-top-lines' />
                  <QRCode
                    value={`${window.location.origin}/qr/${userId}`}
                    logoImage={qrImage}
                    logoWidth={qrImageDimensions.width}
                    logoHeight={qrImageDimensions.height}
                    size={250}
                    fgColor={qrColor}
                  />
                  <div className='qr-bottom-lines' />
                </div>
              </div>

            </section>

          </Grid>

          <Grid item md={9}>

            <section className='right-section'>
              <Typography component='h3'>QR Code Color</Typography>

              <ChromeColorPicker
                color={qrColor}
                onChange={onQRColorChange}
              />

              <br />

              <div className="file-upload">
                <CustomFileUpload
                  accept="image/*"
                  margin="none"
                  value={qrImageFile}
                  onChange={onQRImageChange}
                />
              </div>

              <br />


              <Fade in={!!qrImage} timeout={500}>
                <div>
                  {!!qrImage && (
                    <>
                      <div className='logo-dimensions'>
                        <Grid container spacing={2}>
                          <Grid item md={6}>
                            <CustomInput
                              name="width"
                              value={qrImageDimensions.width}
                              type="number"
                              labelText="Logo Width"
                              placeholder="Logo Width"
                              fullWidth
                              margin="none"
                              onChange={onQrImageDimensionsChange}
                            />
                          </Grid>
                          <Grid item md={6}>
                            <CustomInput
                              name="height"
                              value={qrImageDimensions.height}
                              type="number"
                              labelText="Logo Height"
                              placeholder="Logo Height"
                              fullWidth
                              margin="none"
                              onChange={onQrImageDimensionsChange}
                            />
                          </Grid>
                        </Grid>
                      </div>

                      <br />
                    </>
                  )}

                  {!!qrImageFile && (
                    <TableContainer component={Paper} className='attachment-table-container'>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Attachment Name</TableCell>
                            <TableCell>Remove</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className='attachment-name'>
                                {qrImageFile?.name}
                              </div>

                            </TableCell>
                            <TableCell>

                              <IconButton size="small" className='remove-attachment-btn' onClick={onRemoveQRImage}>
                                <DeleteForeverRoundedIcon size="small" />
                              </IconButton>

                            </TableCell>
                          </TableRow>

                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </div>
              </Fade>

            </section>
          </Grid>
        </Grid>


        <br />
        <br />
        <br />
        <br />
        <br />
        
        <CustomButton
          size="large"
          type="submit"
          innerText="Save Changes"
          onClick={onSaveQRCodeTab}
        // loading={isSubmitting}
        />


      </div>
    </section>
  )
}

export default memo(QRCodeTab)
