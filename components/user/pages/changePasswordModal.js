import { memo, useCallback } from 'react'
import { Modal, Slide, Box, Typography, IconButton, Alert } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
// *** api ***
import axiosClient from '@/api/axiosClient'
// *** components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** Icons ***
import CloseIcon from '@mui/icons-material/Close'
// *** styles ***
import styles from '@/assets/styles/__pages/user/changePasswordModal.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
}


const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Required Field."),
    newPassword: Yup.string().required("Required Field."),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords Mismatch!').required("Required Field.")
})


function ChangePasswordModal({ open, onClose }) {
    const classes = useStyles()

    const onSubmit = useCallback(({ oldPassword, newPassword, confirmNewPassword }, { setSubmitting }) => {

        const body = {
            currentPassword: oldPassword,
            newPassword,
            confirmationPassword: confirmNewPassword
        }


        axiosClient.patch(`/api/user-controller/changePassword`, body)
            .then(res => {
                toast.success("Password updated successfully.")
                onClose()
            })
            .catch(error => {
                console.log("error: ", error);
                toast.error("Fail to update password.")
            })
    }, [onClose])

    return (
        <Modal open={open} className={classes.modal}>
            <Slide
                in={open}
                direction='up'
                timeout={200}
                easing="linear"
                unmountOnExit
            >
                <Box className={classes.modalBox}>
                    <section className='top-section'>
                        <Typography variant='h4' component='h4'>Change Password</Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </section>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, handleSubmit, ...formik }) => (
                            <Form onSubmit={handleSubmit}>

                                <Field name="oldPassword">
                                    {({ field, form, meta: { touched, error } }) => (
                                        <CustomInput
                                            type="password"
                                            labelText="Old Password"
                                            placeholder="Old Password"
                                            disabled={isSubmitting}
                                            error={touched && error && error}
                                            helperText={touched && error ? error : ""}
                                            margin={touched && error ? "dense" : "normal"}
                                            required
                                            fullWidth
                                            {...field}
                                        />
                                    )}
                                </Field>

                                <Field name="newPassword">
                                    {({ field, form, meta: { touched, error } }) => (
                                        <CustomInput
                                            type="password"
                                            labelText="New Password"
                                            placeholder="New Password"
                                            disabled={isSubmitting}
                                            error={touched && error && error}
                                            helperText={touched && error ? error : ""}
                                            margin={touched && error ? "dense" : "normal"}
                                            required
                                            fullWidth
                                            {...field}
                                        />
                                    )}
                                </Field>


                                <Field name="confirmNewPassword">
                                    {({ field, form, meta: { touched, error } }) => (
                                        <CustomInput
                                            type="password"
                                            labelText="Confirm New Password"
                                            placeholder="Confirm New Password"
                                            disabled={isSubmitting}
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
                                    innerText="Submit"
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                />
                            </Form>
                        )}
                    </Formik>
                </Box>

            </Slide>
        </Modal>
    )
}

export default memo(ChangePasswordModal)