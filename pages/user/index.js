import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import { Container, Typography } from '@mui/material'
// *** redux ***
import { useSelector } from 'react-redux'
// *** components ***
import CustomButton from '@/components/common/FormFields/CustomButton'
import ChangePasswordModal from '@/components/user/pages/changePasswordModal'
// *** styles ***
import styles from '@/assets/styles/__pages/user/userHome.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

const changePasswordModalInitialState = { open: false }

export default function UserHome() {
  const classes = useStyles()
  const router = useRouter()

  const { session } = useSelector(state => state.auth)

  const [changePasswordModal, setChangePasswordModal] = useState(changePasswordModalInitialState)

  // ****************** Callbacks ******************
  const handleClick = useCallback(() => { router.push("/user/customize-profile") }, [router])
  const handleCloseChangePasswordModal = useCallback(() => setChangePasswordModal(changePasswordModalInitialState), [])


  // ****************** Side Effects ******************
  useEffect(() => {

    if (session?.firstLogin)
      setChangePasswordModal({ open: true })
  }, [session])

  return (
    <div className={classes.userHome}>
      <Container>

        <ChangePasswordModal
          {...changePasswordModal}
          onClose={handleCloseChangePasswordModal}
        />

        <div className='content'>

          <Typography component="h1">
            Welcome Back,
            <br />
            <small>
              {session?.firstName && session?.firstName}
              {" "}
              {session?.middleName && session?.middleName}
              {" "}
              {session?.lastName && session?.lastName}
            </small>
          </Typography>

          <div className='btn-wrapper'>
            <CustomButton
              size='large'
              innerText="Customize Your Profile"
              onClick={handleClick}
            />
          </div>

        </div>
      </Container>
    </div>
  )
}