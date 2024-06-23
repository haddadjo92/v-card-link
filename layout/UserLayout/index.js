import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'
import { NoSsr } from '@mui/material'
// *** redux ***
import { useSelector } from 'react-redux'
// *** components ***
import Header from './components/Header'
// *** styles ***
import styles from '@/assets/styles/__layout/adminLayout.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

function UserLayout({ children }) {
  const classes = useStyles()
  const router = useRouter()

  const { isAuthenticated, session } = useSelector(state => state.auth)

  // ****************** Side Effects ******************  
  useEffect(() => {
    if (!isAuthenticated || session?.role !== "user")
      router.push('/login')
    else if (isAuthenticated && session?.role === "admin")
      router.push('/admin')
  }, [isAuthenticated, session?.role, router])


  return (
    <NoSsr>
      <div className={classes.adminLayout}>
        <Header />
        <main>
          {children}
        </main>
      </div>
    </NoSsr>
  )
}

export default memo(UserLayout)