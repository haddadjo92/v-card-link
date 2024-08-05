import { memo } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery } from '@mui/material'
import { QRCode } from 'react-qrcode-logo';
// *** styles ***
import { QRDialogStyles } from '@/assets/styles/__pages/admin/qrCodeGenerator.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(QRDialogStyles)

function QRdialog({ open, url, onClose }) {
    const classes = useStyles()
    const isMobile = useMediaQuery('(max-width: 420px)')
    const isSmallScreen = useMediaQuery('(max-width: 991px)')

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle className={classes.dialogTitle} >View QR</DialogTitle>
            <DialogContent className={classes.dialogContent}>

                <div className='qr-code-wrapper'>
                    <div className='content'>
                        <div className='qr-top-lines' />
                        <QRCode value={url} size={isMobile ? 150 : isSmallScreen ? 200 : 250} />
                        <div className='qr-bottom-lines' />
                    </div>
                </div>


            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button
                    autoFocus
                    color='error'
                    variant="contained"
                    onClick={onClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(QRdialog)
