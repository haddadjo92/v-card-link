import { memo, useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
// *** api ***
import axiosClient from '@/api/axiosClient'
// *** redux ***
import { useSelector } from 'react-redux'
// *** components ***
import QRdialog from '@/components/admin/pages/QrCodeGenerator/QRdialog'


const qrDialogInitialState = { open: false, url: "" }

function GeneratedQRs() {
    const [loading, setLoading] = useState(true)
    const [tableDate, setTableDate] = useState([])
    const [qrDialog, setQrDialog] = useState(qrDialogInitialState)


    const authState = useSelector(state => state.auth)
    const userId = authState?.session?.id;

    // ****************** Callbacks ******************
    const handelCloseQRDialog = useCallback(() => setQrDialog(qrDialogInitialState), [])
    const handleViewQRCode = useCallback((event) => { setQrDialog({ open: true, url: event.target.getAttribute("data-url") }) }, [])

    const toggleActivateQRCode = useCallback((event) => {
        const id = event.target.getAttribute("data-id")
        const type = event.target.getAttribute("data-type")
        const activeStatus = event.target.getAttribute("data-active-status")



        const body = [{
            // qrId: Number(id),
            fieldName: type,
            active: activeStatus === "active" ? false : true
        }]

        axiosClient.put(`/api/qr-generator/qrCodeActivity?userId=${userId}`, body)
            .then(res => {
                toast.success(`QR ${type} was successfully ${activeStatus === "active" ? "Deactivated" : "Activated"}.`)

                setTableDate(prevState => {
                    let result = _.map(prevState, (props) => {
                        if (String(props?.id) === String(id))
                            return { ...props, active: activeStatus === "active" ? false : true }
                        return props
                    })

                    return result
                })
            })
            .catch(error => {
                toast.error(`Fail to ${activeStatus === "active" ? "Deactivate" : "Activate"} `)
            })

    }, [userId])


    // ****************** Side Effects ******************
    useEffect(() => {

        axiosClient.get(`/api/qr-generator/retrieveUserQRCode?userId=${userId}`)
            .then(res => {
                const tableData = _.map(res?.data, ({ id, fieldName, fieldValue, active }) => ({ id, type: fieldName, value: fieldValue, active }))
                setTableDate(tableData)
                setLoading(false)
            })
            .catch(() => {
                setLoading(true)
                axiosClient.get(`/api/qr-generator/retrieveUserQRCode?userId=${userId}`)
                    .then(res => {
                        const tableData = _.map(res?.data, ({ id, fieldName, fieldValue, active }) => ({ id, type: fieldName, value: fieldValue, active }))
                        setTableDate(tableData)
                    })
                    .catch(error => {
                        console.log("error: ", error);
                        toast.error("Fail to fetch generated QR's")
                    })
                    .finally(() => setLoading(false))
            })
    }, [userId])



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
                                        data-url={
                                            type === "whatsAppNumber" ? `https://wa.me/${value}` :
                                                type === "mobileNumber" ? `tel:${value}` :
                                                    type === "email" ? `mailto:${value}` :
                                                        value
                                        }
                                        className='view-qr-btn'
                                        variant='text'
                                        disableRipple
                                        onClick={handleViewQRCode}
                                        disabled={!active}
                                    >
                                        View
                                    </Button>

                                </TableCell>
                                <TableCell>

                                    <Button
                                        data-id={id}
                                        data-type={type}
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