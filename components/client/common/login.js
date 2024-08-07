import { useRouter } from 'next/router'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { setCookie } from "cookies-next";
import { Alert, Typography } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
// *** redux ***
import { useSelector, useDispatch } from 'react-redux'
import { login } from '@/store/reducers/authReducer'
// *** components ***
import CustomInput from '@/components/common/FormFields/CustomInput'
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** Icons ***
import LoginIcon from '@mui/icons-material/Login';
// *** styles ***
import styles from '@/assets/styles/__pages/login.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)



const initialValues = {
  username: "",
  password: ""
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required Field."),
  password: Yup.string().required("Required Field."),
})



export default function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()

  const { isAuthenticated, session } = useSelector(state => state.auth)

  const [error, setError] = useState("")

  // ****************** Memos ******************
  const loginBtnStartIcon = useMemo(() => <LoginIcon />, [])

  // ****************** Callbacks ******************
  const onSubmit = useCallback(async ({ username, password }, { setSubmitting }) => {
    setSubmitting(true)

    const headers = { 'Content-Type': 'application/json' }
    const body = {
      username,
      password
    }

    axios.post("/api/auth/login", body, { headers, withCredentials: true })
      .then((res) => {
        setCookie("token", res?.data?.token)
        dispatch(login({ session: res.data?.userInfo }))
        if (res.data?.userInfo?.role === "ADMIN")
          router.push("/admin")
        else if (res.data?.userInfo?.role === "USER")
          router.push("/user")
      })
      .catch((error) => {
        console.log("error: ", error);
        setError(error?.message || "Invalid username or password.")
        setSubmitting(false)
      })
  }, [dispatch, router])



  // ****************** Side Effects ******************
  useEffect(() => {

    if (isAuthenticated && session?.role === "admin")
      router.push('/admin')
    else if (isAuthenticated && session?.role === "user")
      router.push('/user')

  }, [isAuthenticated, session, router])


  return (
    <div className={classes.login}>
      <div className='content'>



        <div className='inner-content'>
          <section className='upper-section'>
            <Typography>Own your smart business <br /> card from</Typography>
            <Typography component="h1">vCard Link</Typography>
            <Typography>Since 2015</Typography>
          </section>

          <section className='login-form-section'>
            {error && (
              <Alert color='error' severity='error' onClose={() => setError("")}>
                Invalid Username or password.
              </Alert>
            )}


            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, handleSubmit, ...formik }) => (
                <Form onSubmit={handleSubmit}>
                  <Field name="username">
                    {({ field, form, meta: { touched, error } }) => (
                      <CustomInput
                        labelText="Username"
                        placeholder="Username"
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

                  <Field name="password">
                    {({ field, form, meta: { touched, error } }) => (
                      <CustomInput
                        type="password"
                        labelText="Password"
                        placeholder="Password"
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
                    innerText="Login"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    startIcon={loginBtnStartIcon}
                  />

                </Form>
              )}
            </Formik>
          </section>
        </div>

      </div>
    </div>
  )
}
