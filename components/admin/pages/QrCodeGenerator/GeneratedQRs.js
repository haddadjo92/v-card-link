import { memo, useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material'
// *** components ***
import QRdialog from '@/components/admin/pages/QrCodeGenerator/QRdialog'

const dummyData = [
    {
        id: 1,
        type: "WhatsApp",
        value: "Whatsapp.me/421?[2658",
        active: false
    },
    {
        id: 2,
        type: "WhatsApp",
        value: "Whatsapp.me/7822658",
        active: false
    },
    {
        id: 3,
        type: "URL",
        value: "http://www.elavo.com",
        active: false
    },
    {
        id: 4,
        type: "File",
        value: "://userlaptop/c/data/ABV",
        active: false
    },
    {
        id: 5,
        type: "MobileNumber",
        value: "+962789562314",
        active: false
    },
]


const qrDialogInitialState = { open: false, url: "" }

function GeneratedQRs() {
    const [loading, setLoading] = useState(true)
    const [tableDate, setTableDate] = useState([])
    const [qrDialog, setQrDialog] = useState(qrDialogInitialState)


    // ****************** Callbacks ******************
    const handleViewQRCode = useCallback((event) => { setQrDialog({ open: true, url: event.target.getAttribute("data-url") }) }, [])
    const handelCloseQRDialog = useCallback(() => setQrDialog(qrDialogInitialState), [])

    const toggleActivateQRCode = useCallback((event) => {
        const id = event.target.getAttribute("data-id")
        const activeStatus = event.target.getAttribute("data-active-status")

        setTableDate(prevState => {
            let result = _.map(prevState, (props) => {

                if (String(props?.id) === String(id))
                    return { ...props, active: activeStatus === "active" ? false : true }
                return props
            })

            return result
        })


    }, [])


    // ****************** Side Effects ******************
    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setLoading(false)
            setTableDate(dummyData)
        }, 2000)

        return () => clearTimeout(timeoutId)
    }, [])



    return (
        <div className='generated-qrs'>

            <QRdialog
                {...qrDialog}
                onClose={handelCloseQRDialog}
            />

            <TableContainer component={Paper} className='table-container'>
                <Table size="small" >
                    <TableHead>

                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>QR Code</TableCell>
                            <TableCell>Manage</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>

                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className='loading-wrapper'>
                                        <CircularProgress size={60} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : tableDate?.map(({ id, type, value, active }, Idx) => (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row">{Idx + 1}</TableCell>
                                <TableCell>{type}</TableCell>
                                <TableCell>{value}</TableCell>
                                <TableCell>

                                    <Button
                                        data-url={type}
                                        className='view-qr-btn'
                                        variant='text'
                                        disableRipple
                                        onClick={handleViewQRCode}
                                    >
                                        View
                                    </Button>

                                </TableCell>
                                <TableCell>

                                    <Button
                                        data-id={id}
                                        data-active-status={active ? "active" : "inactive"}
                                        variant='contained'
                                        className={`toggle-activate-btn ${active ? "active" : "inactive"}`}
                                        onClick={toggleActivateQRCode}
                                        disableRipple
                                    >
                                        {active ? "Deactivate" : "Activate"}
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )
}

export default memo(GeneratedQRs)