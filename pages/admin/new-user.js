import { useState, useCallback } from 'react'
import { Grid, Container, Typography } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { QRCode } from 'react-qrcode-logo';
// *** components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomButton from '@/components/common/FormFields/CustomButton'
import ConfirmDialog from '@/components/common/confirmDialog'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/newUser.styles.js'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const initialValues = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: ""
}


const validationSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    mobileNumber: Yup.string(),
    email: Yup.string().email("Invalid Email Format"),
    password: Yup.string().required("Required Field.")
})


const confirmDialogInitialState = {
    open: false, 
    title: "", 
    content: "", 
    variant: "success", 
    resolveBtnText: "Yes", 
    rejectBtnText: "No"    
}

export default function NewUser() {
    const classes = useStyles()
    const [qrCode, setQrCode] = useState("")    
    const [confirmDialog, setConfirmDialog] = useState(confirmDialogInitialState)

    // ****************** Callbacks ******************
    const handleCloseConfirmDialog = useCallback(() => { setConfirmDialog(confirmDialogInitialState)  },[])    
    const handleResolveConfirmDialog = useCallback(() => {
        setConfirmDialog(confirmDialogInitialState)
    }, [])

    
    const onSubmit = useCallback(({ firstName, lastName, mobileNumber, email, password }, { setSubmitting }) => {
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            setQrCode("http://www.google.com")  

            setConfirmDialog(prevState => {
                return {
                    ...prevState,
                    open: true,
                    title: "",
                    content: "Do you wish to send the users's portal URL to this user ?"
                }
            })

        }, 2000)
    }, [])


    // ****************** Memos ******************


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


                                        <Field name="password">
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
                                        </Field>

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
