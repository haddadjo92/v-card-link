import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Container, Typography } from '@mui/material'
// *** components ***
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** styles ***
import styles from '@/assets/styles/__pages/user/userHome.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

export default function UserHome() {
  const classes = useStyles()
  const router = useRouter()


  // ****************** Callbacks ******************
  const handleClick = useCallback(() => { router.push("/user/customize-profile") }, [router])


  return (
    <div className={classes.userHome}>
      <Container>
        <div className='content'>

          <Typography component="h1">
            Welcome Back,
            <br />
            User
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