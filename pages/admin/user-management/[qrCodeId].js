import { useRouter } from 'next/router'
import { useEffect, useCallback } from 'react'
import { Grid, Container, Typography, useMediaQuery } from '@mui/material'
import { QRCode } from 'react-qrcode-logo';
import { toast } from 'react-toastify'
import _ from 'lodash'
// *** api ***
import axiosServer from '@/api/axiosServer'
// *** components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomSelect from '@/components/common/FormFields/CustomSelect'
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/userManagementDetails.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



export default function UserManagementDetails({ errorFetchingUserProfile, errorFetchingPhoneTypes, id, firstName, middleName, lastName, phones, phoneTypeOptions, email }) {
    const classes = useStyles()
    const router = useRouter()
    const isSmallScreen = useMediaQuery('(max-width: 991px)')


    // ****************** Callbacks ******************
    const handleBack = useCallback(() => { router.back() }, [router])


    // ****************** Side Effects ******************
    useEffect(() => {
        if (errorFetchingPhoneTypes)
            toast.error("Error Fetching Phone Types.")
    }, [errorFetchingPhoneTypes])



    return (
        <div className={classes.userManagementDetails}>
            <Container>
                {errorFetchingUserProfile ? (
                    <div className='error-fetching-user-profile'>
                        <Typography component="h1">Fail to fetch user profile.</Typography>
                        <CustomButton
                            type="button"
                            size="large"
                            innerText="Back"
                            onClick={handleBack}
                        />
                    </div>
                ) : (
                    <>
                        <div className='content'>

                            <Typography component="h1">User&apos;s QR Code</Typography>

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
                                            labelText="Middle Name"
                                            placeholder="Middle Name"
                                            margin="normal"
                                            value={middleName}
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

                                        <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
                                            <Grid item md={4}>
                                                <CustomSelect
                                                    labelText="Phone Type"
                                                    placeholder="Phone Type"
                                                    margin="normal"
                                                    fullWidth
                                                    value={phones?.[0]?.phoneType?.id}
                                                    options={phoneTypeOptions}
                                                    readOnly
                                                />

                                            </Grid>
                                            <Grid item md={8} xs={12}>
                                                <CustomInput
                                                    labelText="Mobile Number"
                                                    placeholder="Mobile Number"
                                                    margin="normal"
                                                    value={phones?.[0]?.phoneNumber}
                                                    fullWidth
                                                    readOnly
                                                />
                                            </Grid>
                                        </Grid>



                                        <CustomInput
                                            labelText="Email"
                                            placeholder="Email"
                                            margin="normal"
                                            value={email}
                                            fullWidth
                                            readOnly
                                        />

                                        {/* <CustomInput
                                        type="password"
                                        labelText="Password"
                                        placeholder="Password"
                                        margin="normal"
                                        value={password}
                                        fullWidth
                                        readOnly
                                    /> */}


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
                                            <QRCode value={`${window.location.origin}/qr/${id}`} size={isSmallScreen ? 150 : 250} />
                                            <div className='qr-bottom-lines' />
                                        </div>
                                    </div>

                                </Grid>
                            </Grid>

                        </div>
                    </>
                )}
            </Container>

        </div>
    )
}





export async function getServerSideProps(ctx) {

    const axios = axiosServer(ctx?.req, ctx?.res)
    let data = {}
    let errorFetchingUserProfile = false;
    let errorFetchingPhoneTypes = false;
    let phoneTypeOptions = [];

    try {
        data = (await axios.get(`/users/${ctx?.query?.qrCodeId}/user/profile`)).data

        const phoneTypesData = (await axios.get("/users/phone/type")).data

        try {
            phoneTypeOptions = _.map(phoneTypesData, ({ id, phoneType }) => ({ name: phoneType, value: id }));
        }
        catch (error) {
            errorFetchingPhoneTypes = true
        }
    }
    catch (error) {
        errorFetchingUserProfile = true
    }

    return {
        props: {
            errorFetchingUserProfile,
            errorFetchingPhoneTypes,
            phoneTypeOptions,
            ...data
        },
    };
}