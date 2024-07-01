import { useRouter } from 'next/router'
import { memo, useState, useEffect, useCallback } from 'react'
import { NoSsr } from '@mui/material'
// *** redux ***
import { useSelector } from 'react-redux'
// *** components ***
import Header from './components/Header'
import Drawer from './components/Drawer'
// *** styles ***
import styles from '@/assets/styles/__layout/adminLayout.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

function AdminLayout({ children }) {
  const classes = useStyles()
  const router = useRouter()

  const { isAuthenticated, session } = useSelector(state => state.auth)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // ****************** Callbacks ******************
  const toggleOpenDrawer = useCallback(() => setDrawerOpen(prev => !prev), [])


  // ****************** Side Effects ******************
  useEffect(() => {
    if (!isAuthenticated || session?.role !== "ADMIN")
      router.push('/login')
    else if (isAuthenticated && session?.role === "USER")
      router.push('/user')
  }, [isAuthenticated, session?.role, router])


  return (
    <NoSsr>
      <div className={classes.adminLayout}>
        <Header onOpenDrawer={toggleOpenDrawer} />
        <main>
          {children}
          <Drawer open={drawerOpen} onClose={toggleOpenDrawer} />
        </main>
      </div>
    </NoSsr>
  )
}

export default memo(AdminLayout)