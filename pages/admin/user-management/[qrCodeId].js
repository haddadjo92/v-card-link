import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { Grid, Container, Typography } from '@mui/material'
import { QRCode } from 'react-qrcode-logo';
// *** components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/userManagementDetails.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const dummyData = [
    {
        id: "66714319c6105d1afdc68fbd",
        firstName: "Johnnie",
        lastName: "Burton",
        mobileNumber: "+1 (923) 515-2142",
        email: "johnnieburton@matrixity.com",
        password: "4f9ef0f5-c08c-42c1-9910-bcbf4e1abc95",
        qrCode: "https://www.google.com"
    },
    {
        id: "66714319c5dcc71489ba48f9",
        firstName: "Lynch",
        lastName: "Aguirre",
        mobileNumber: "+1 (899) 593-2855",
        email: "lynchaguirre@matrixity.com",
        password: "f2a87d2c-58db-481f-bba6-db0c45cb9314",
        qrCode: "https://youtube.com"
    },
    {
        id: "667143190b607cef119ff574",
        firstName: "Stephanie",
        lastName: "Allison",
        mobileNumber: "+1 (862) 521-2473",
        email: "stephanieallison@matrixity.com",
        password: "23151960-cf94-4c64-9e89-cfe153d3bd6f",
        qrCode: "https://yahoo.com"
    },
    {
        id: "667143191eb17fc7d44d5581",
        firstName: "Rosemary",
        lastName: "Cohen",
        mobileNumber: "+1 (908) 510-2449",
        email: "rosemarycohen@matrixity.com",
        password: "05f3bd17-e7ae-4eb1-aacb-4cd0e3182a61",
        qrCode: "https://outlook.com"
    },
    {
        id: "66714319b66eb694e50cf9e0",
        firstName: "Ortiz",
        lastName: "Copeland",
        mobileNumber: "+1 (836) 522-2704",
        email: "ortizcopeland@matrixity.com",
        password: "f34c088b-a168-4543-ae7f-4f72b6861b45",
        qrCode: "https://www.bing.com"
    },
    {
        id: "66714319fe3909f50b551d55",
        firstName: "Petty",
        lastName: "Everett",
        mobileNumber: "+1 (897) 552-3945",
        email: "pettyeverett@matrixity.com",
        password: "94f482d2-dba2-49a8-a01d-107a070d7be9",
        qrCode: "https://www.tomtom.com/"
    },
    {
        id: "66714319decbeac8fc8dc7d0",
        firstName: "Weeks",
        lastName: "Crawford",
        mobileNumber: "+1 (929) 450-3816",
        email: "weekscrawford@matrixity.com",
        password: "3382d48c-c8bd-47e9-aab5-1a35e22ff976",
        qrCode: "https://instagram.com"
    }
]


export default function UserManagementDetails({ firstName, lastName, mobileNumber, email, password, qrCode }) {
    const classes = useStyles()
    const router = useRouter()

    // ****************** Callbacks ******************
    const handleBack = useCallback(() => { router.back() }, [router])

    return (
        <div className={classes.userManagementDetails}>
            <Container>
                <div className='content'>

                    <Typography component='h1'>User's QR Code</Typography>

                    <Grid container>
                        <Grid item md={6}>

                            <div className='qr-form'>
                                <CustomInput
                                    labelText="First Name"
                                    placeholder="First Name"
                                    margin="normal"
                                    value={firstName}
                                    fullWidth                                    
                                    readOnly
                                />


                                <CustomInput
                                    labelText="Last Name"
                                    placeholder="Last Name"
                                    margin="normal"
                                    value={lastName}
                                    fullWidth
                                    readOnly
                                />


                                <CustomInput
                                    labelText="Mobile Number"
                                    placeholder="Mobile Number"
                                    margin="normal"
                                    value={mobileNumber}
                                    fullWidth
                                    readOnly
                                />

                                <CustomInput
                                    labelText="Email"
                                    placeholder="Email"
                                    margin="normal"
                                    value={email}
                                    fullWidth
                                    readOnly
                                />

                                <CustomInput
                                    type="password"
                                    labelText="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    value={password}
                                    fullWidth
                                    readOnly
                                />


                                <CustomButton
                                    type="submit"
                                    size="large"
                                    innerText="Back"
                                    onClick={handleBack}
                                />
                            </div>

                        </Grid>
                        <Grid item md={6}>

                            <div className='qr-code-wrapper'>
                                <div className='content'>
                                    <div className='qr-top-lines' />
                                    <QRCode value={qrCode} size={250} />
                                    <div className='qr-bottom-lines' />
                                </div>
                            </div>

                        </Grid>
                    </Grid>


                </div>
            </Container>
        </div>
    )
}





export async function getServerSideProps(ctx) {    
    
    const data = dummyData[Math.floor(Math.random() * ((dummyData.length - 1) - 0 + 1) + 0)]

    return {
        props: {
            ...data
        },
    };
}










