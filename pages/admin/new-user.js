import { useState, useCallback, useEffect } from 'react'
import { Grid, Container, Typography } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { QRCode } from 'react-qrcode-logo';
import { toast } from 'react-toastify'
import _ from 'lodash'
// *** api ***
import axiosClient from '@/api/axiosClient'
// *** components ***
import CustomSelect from '@/components/common/FormFields/CustomSelect'
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomButton from '@/components/common/FormFields/CustomButton'
import ConfirmDialog from '@/components/common/confirmDialog'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/newUser.styles.js'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    phoneType: "",
    mobileNumber: "",
    email: "",
    role: ""
    // password: ""
}


const validationSchema = Yup.object().shape({
    firstName: Yup.string(),
    middleName: Yup.string(),
    lastName: Yup.string(),
    phoneType: Yup.string(),
    mobileNumber: Yup.string(),
    email: Yup.string().email("Invalid Email Format"),
    role: Yup.string().required("Required Field.")
    // password: Yup.string().required("Required Field.")
})


const confirmDialogInitialState = {
    open: false,
    title: "",
    content: "",
    variant: "success",
    resolveBtnText: "Yes",
    rejectBtnText: "No"
}


const UserRoleOptions = [
    { name: "Admin", value: "ADMIN" },
    { name: "User", value: "USER" }
]


export default function NewUser() {
    const classes = useStyles()
    const [qrCode, setQrCode] = useState("")
    const [confirmDialog, setConfirmDialog] = useState(confirmDialogInitialState)
    const [phoneTypeOptions, setPhoneTypeOptions] = useState([])

    // ****************** Callbacks ******************
    const handleCloseConfirmDialog = useCallback(() => { setConfirmDialog(confirmDialogInitialState) }, [])
    const handleResolveConfirmDialog = useCallback(() => {

        setConfirmDialog(confirmDialogInitialState)
    }, [])


    const onSubmit = useCallback(({ firstName, middleName, lastName, phoneType, mobileNumber, email, role }, { setSubmitting }) => {

        setSubmitting(true)
        const body = {
            email,
            phoneRequestDTO: [],
            // phoneRequestDTO: [
            //     {
            //         phoneNumber: mobileNumber,
            //         phoneTypeId: phoneType
            //     }
            // ],
            firstName,
            middleName,
            lastName,
            username: email,
            title: "",
            role,
            "workInformation": {
                "description": "",
                "workingDays": "",
                "workingHours": "",
                "webSite": "",
                "workAddress": {
                    "addressLine": "",
                    "location": ""
                }
            },
            "userAddress": {
                "addressLine": "",
                "location": ""
            },
            message: window.location.origin,
            active: true
        }

        axiosClient
            .post("/api/management/createNewUsers", body)
            .then(res => {
                setQrCode(`${window.location.origin}/qr/${res?.id}`)
                setConfirmDialog(prevState => {
                    return {
                        ...prevState,
                        open: true,
                        title: "Do you wish to send the users's portal URL to this user ?",
                        content: ""
                    }
                })

            })
            .catch(error => {
                console.log("error: ", error);
                toast.error("Fail to create a new user account.")
            })
            .finally(() => setSubmitting(false))
    }, [])


    // ****************** Side Effects ******************
    useEffect(() => {

        axiosClient.get("/api/user-controller/getPhoneType")
            .then(res => {
                const result = _.map(res.data, ({ id, phoneType }) => ({ name: phoneType, value: id }));
                setPhoneTypeOptions(result)                
            })
            .catch(error => toast.error("Fail to fetch phone types."))

    }, [])

    

    return (
        <div className={classes.newUser}>
            <Container>
                <div className='content'>

                    <ConfirmDialog
                        {...confirmDialog}
                        onResolve={handleResolveConfirmDialog}
                        onClose={handleCloseConfirmDialog}
                        onReject={handleCloseConfirmDialog}
                    />

                    <Typography component='h1'>New User</Typography>

                    <Grid container>
                        <Grid item md={6}>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ handleSubmit, isSubmitting, ...formik }) => (
                                    <Form className='qr-form' onSubmit={handleSubmit}>

                                        <Field name="firstName">
                                            {({ field, form, meta: { touched, error } }) => (
                                                <CustomInput
                                                    labelText="First Name"
                                                    placeholder="First Name"
                                                    disabled={isSubmitting || !!qrCode}
                                                    error={touched && error && error}
                                                    helperText={touched && error ? error : ""}
                                                    margin={touched && error ? "dense" : "normal"}
                                                    fullWidth
                                                    {...field}
                                                />
                                            )}
                                        </Field>

                                        <Field name="middleName">
                                            {({ field, form, meta: { touched, error } }) => (
                                                <CustomInput
                                                    labelText="Middlename"
                                                    placeholder="Middlename"
                                                    disabled={isSubmitting || !!qrCode}
                                                    error={touched && error && error}
                                                    helperText={touched && error ? error : ""}
                                                    margin={touched && error ? "dense" : "normal"}
                                                    fullWidth
                                                    {...field}
                                                />
                                            )}
                                        </Field>


                                        <Field name="lastName">
                                            {({ field, form, meta: { touched, error } }) => (
                                                <CustomInput
                                                    labelText="Last Name"
                                                    placeholder="Last Name"
                                                    disabled={isSubmitting || !!qrCode}
                                                    error={touched && error && error}
                                                    helperText={touched && error ? error : ""}
                                                    margin={touched && error ? "dense" : "normal"}
                                                    fullWidth
                                                    {...field}
                                                />
                                            )}
                                        </Field>


                                        <Grid container spacing={2}>
                                            <Grid item md={4}>
                                                <Field name="phoneType">
                                                    {({ field, form, meta: { touched, error } }) => (
                                                        <CustomSelect
                                                            labelText="Phone Type"
                                                            placeholder="Phone Type"
                                                            error={touched && error && error}
                                                            helperText={touched && error ? error : ""}
                                                            margin={touched && error ? "dense" : "normal"}
                                                            fullWidth
                                                            required
                                                            options={phoneTypeOptions}
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>

                                            </Grid>
                                            <Grid item md={8}>
                                                <Field name="mobileNumber">
                                                    {({ field, form, meta: { touched, error } }) => (
                                                        <CustomInput
                                                            labelText="Mobile Number"
                                                            placeholder="Mobile Number"
                                                            disabled={isSubmitting || !!qrCode}
                                                            error={touched && error && error}
                                                            helperText={touched && error ? error : ""}
                                                            margin={touched && error ? "dense" : "normal"}
                                                            fullWidth
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                        </Grid>




                                        <Field name="email">
                                            {({ field, form, meta: { touched, error } }) => (
                                                <CustomInput
                                                    labelText="Email"
                                                    placeholder="Email"
                                                    disabled={isSubmitting || !!qrCode}
                                                    error={touched && error && error}
                                                    helperText={touched && error ? error : ""}
                                                    margin={touched && error ? "dense" : "normal"}
                                                    fullWidth
                                                    {...field}
                                                />
                                            )}
                                        </Field>


                                        <Field name="role">
                                            {({ field, form, meta: { touched, error } }) => (
                                                <CustomSelect
                                                    labelText="User Role"
                                                    placeholder="User Role"
                                                    error={touched && error && error}
                                                    helperText={touched && error ? error : ""}
                                                    margin={touched && error ? "dense" : "normal"}
                                                    fullWidth
                                                    required
                                                    options={UserRoleOptions}
                                                    {...field}
                                                />
                                            )}
                                        </Field>


                                        {/* <Field name="password">
                                            {({ field, form, meta: { touched, error } }) => (
                                                <CustomInput
                                                    type="password"
                                                    labelText="Password"
                                                    placeholder="Password"
                                                    disabled={isSubmitting || !!qrCode}
                                                    error={touched && error && error}
                                                    helperText={touched && error ? error : ""}
                                                    margin={touched && error ? "dense" : "normal"}
                                                    required
                                                    fullWidth
                                                    {...field}
                                                />
                                            )}
                                        </Field> */}

                                        <CustomButton
                                            type="submit"
                                            size="large"
                                            innerText="Save"
                                            loading={isSubmitting}
                                            disabled={isSubmitting || !!qrCode}
                                        />
                                    </Form>
                                )}
                            </Formik>


                        </Grid>
                        <Grid item md={6}>

                            <div className='qr-code-wrapper'>
                                <div className={`qr-code-shader ${!!qrCode ? "disabled" : ""}`} />
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
