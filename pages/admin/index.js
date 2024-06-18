import { useRouter } from 'next/router'
import { useCallback, useLayoutEffect, useMemo } from 'react'
import { Container, Typography } from '@mui/material'
// *** components ***
import CustomButton from '@/components/common/FormFields/CustomButton'
// *** redux ***
import { useSelector } from 'react-redux'
// *** Icons ***
import AddIcon from '@mui/icons-material/Add'
// *** styles ***
import styles from '@/assets/styles/__pages/admin/adminHome.styles'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(styles)

export default function AdminHome() {
    const classes = useStyles()    
    const router = useRouter()
    const { isAuthenticated } = useSelector(state => state.auth)

    // ****************** Memos ******************
    const newUserBtnStartIcon = useMemo(() => <AddIcon />, [])


    // ****************** Callbacks ******************
    const handleAddNewUser = useCallback(() => { router.push("/admin/new-user") }, [router])


    // ****************** Side Effects ******************
    useLayoutEffect(() => {
        if (!isAuthenticated)
            router.push('/login')
    }, [isAuthenticated, router])


    return (
        <div className={classes.adminHome}>
            <Container>
                <div className='content'>

                    <Typography component="h1">
                        Welcome Back,
                        <br />
                        Admin
                    </Typography>

                    <div className='btn-wrapper'>
                        <CustomButton
                            size='large'
                            innerText="New User"
                            startIcon={newUserBtnStartIcon}
                            onClick={handleAddNewUser}
                        />
                    </div>
                    
                </div>
            </Container>
        </div>
    )
}