import { memo, useState, useCallback } from 'react'
import { NoSsr } from '@mui/material'
// *** components ***
import Header from './components/Header'
import Drawer from './components/Drawer'
// *** styles ***
import styles from '@/assets/styles/__layout/adminLayout.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

function AdminLayout({ children }) {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleOpenDrawer = useCallback(() => setDrawerOpen(prev => !prev), [])

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