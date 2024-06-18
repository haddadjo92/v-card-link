import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material'
import _ from 'lodash'
// *** components ***
import CustomCheckbox from '@/components/common/FormFields/CustomCheckbox'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/userManagement.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const dummyData = [
  {
    id: 1,
    email: "example.ex@email.com",
    active: true,
    qrCodeId: "qr_1"
  },
  {
    id: 2,
    email: "secondexample.ex@email.com",
    active: true,
    qrCodeId: "qr_2"
  },
  {
    id: 3,
    email: "thirdexample.ex@email.com",
    active: true,
    qrCodeId: "qr_3"
  },
  {
    id: 4,
    email: "forthexample.ex@email.com",
    active: true,
    qrCodeId: "qr_4"
  },
  {
    id: 5,
    email: "fifthexample.ex@email.com",
    active: true,
    qrCodeId: "qr_5"
  },
  {
    id: 6,
    email: "sixthexample.ex@email.com",
    active: true,
    qrCodeId: "qr_6"
  },
  {
    id: 7,
    email: "seventhexample.ex@email.com",
    active: true,
    qrCodeId: "qr_7"
  },
]


export default function UserManagement() {
  const classes = useStyles()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  // ****************** Callbacks ******************

  const handleCheckChange = useCallback((checkId, currentCheck) => {

    setLoading(true)

    setTimeout(() => {
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
      setLoading(false)
    }, 500)
    



  }, [data])


  // ****************** Side Effects ******************
  useEffect(() => {

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setData(dummyData)
    }, 2000)

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
                  <TableCell>Number</TableCell>
                  <TableCell>Email</TableCell>
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
                  data?.map(({ id, email, active, qrCodeId }, Idx) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">{Idx + 1}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell align="center">

                        <div className='management-checks'>
                          <CustomCheckbox labelText="Active" checked={active} onChange={() => handleCheckChange(id, active)} />
                          <CustomCheckbox labelText="Inactive" checked={!active} onChange={() => handleCheckChange(id, active)} />
                        </div>

                      </TableCell>
                      <TableCell align="center" className='view-qr-code'>

                        <Link href={`/admin/user-management/${qrCodeId}`}>
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
