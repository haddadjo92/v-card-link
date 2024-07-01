import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material'
import _ from 'lodash'
import { toast } from 'react-toastify'
// *** api ***
import axiosClient from '@/api/axiosClient'
// *** components ***
import CustomCheckbox from '@/components/common/FormFields/CustomCheckbox'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/userManagement.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



export default function UserManagement() {
  const classes = useStyles()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  // ****************** Callbacks ******************

  const handleCheckChange = useCallback((checkId, currentCheck) => {
    setLoading(true)

    axiosClient.post(`/api/management/${currentCheck ? "deActivateUser" : "activateUser"}?id=${checkId}`)
      .then(res => {
        const result = _.map(data, (props) => {
          if (props?.id === checkId) {
            return {
              ...props,
              active: !currentCheck
            }
          }

          return props
        })

        setData(result)
        toast.success(`User with id=${checkId} has been ${currentCheck ? "deactivated" : "activated"} successfully.`)
      })
      .catch(error => {
        console.log("error: ", error);
        toast.error(`Fail to ${currentCheck ? "deactivate" : "activate"} users with id=${checkId}.`)
      })
      .finally(() => setLoading(false))
  }, [data])


  // ****************** Side Effects ******************
  useEffect(() => {

    setLoading(true)

    axiosClient.get("/api/management/getAllUsers")
      .then(res => setData(res?.data))
      .catch(error => {
        console.log("error: ", error);
        toast.error("Fail to get management users.")
      })
      .finally(() => setLoading(false))
  }, [])


  return (
    <div className={classes.userManagement}>
      <Container>
        <div className='content'>

          <Typography component='h1'>Users Management</Typography>

          <TableContainer component={Paper} >
            <Table size="small" >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ maxWidth: 48 }}>#</TableCell>
                  {/* <TableCell>First Name</TableCell> */}
                  {/* <TableCell>Last Name</TableCell> */}
                  <TableCell>Email</TableCell>
                  {/* <TableCell>Phone Number</TableCell> */}
                  <TableCell>Management</TableCell>
                  <TableCell align="center">QR Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className='loading-wrapper'>
                        <CircularProgress size={60} />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map(({ id, firstName, lastName, email, phone, active, qrCodeId, username }, Idx) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row" sx={{ maxWidth: 48 }}>{Idx + 1}</TableCell>
                      {/* <TableCell>{firstName}</TableCell> */}
                      {/* <TableCell>{lastName}</TableCell> */}
                      <TableCell>{email}</TableCell>
                      {/* <TableCell>
                        {Array.isArray(phone) && phone?.length > 0 ? (
                          <div className='phoneNumber'>
                            <span>{phone?.[0]?.phoneType?.type}</span>
                            <span>{phone?.[0]?.phoneNumber}</span>
                          </div>
                        ) : (
                          <div className='no-data'>No Data</div>
                        )}
                      </TableCell> */}

                      <TableCell align="center">
                        <div className='management-checks'>
                          <CustomCheckbox labelText="Active" checked={active} onChange={() => handleCheckChange(id, active)} />
                          <CustomCheckbox labelText="Inactive" checked={!active} onChange={() => handleCheckChange(id, active)} />
                        </div>
                      </TableCell>

                      <TableCell align="center" className='view-qr-code'>
                        <Link href={`/admin/user-management/${id}`}>
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}

              </TableBody>
            </Table>
          </TableContainer>

        </div>
      </Container>
    </div>
  )
}
