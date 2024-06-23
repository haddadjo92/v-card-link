import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useState, cloneElement, useMemo, useCallback } from 'react'
import { AppBar, Toolbar, Button, Stack, CircularProgress, Typography, useScrollTrigger } from '@mui/material';
// *** Icons ***
import { useDispatch } from 'react-redux'
import { logout } from '@/store/reducers/authReducer'
// *** Icons ***
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

function ElevationScroll({ children, ...props }) {
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    return cloneElement(children, { elevation: trigger ? 4 : 0 });
}

function Header(props) {
    const [logoutBtnIsLoading, setLogoutBtnIsLoading] = useState(false)

    const router = useRouter()
    const dispatch = useDispatch()

    // ****************** Callbacks ******************
    const handleLogout = useCallback(() => {
        setLogoutBtnIsLoading(true)

        setTimeout(() => {
            dispatch(logout())
            router.push("/login")
        }, 2000)
    }, [dispatch, router])


    // ****************** Memos ******************
    const logoutBtnStartIcon = useMemo(() => { return logoutBtnIsLoading ? <CircularProgress size={18} sx={{ color: "#FFF" }} /> : <LogoutIcon /> }, [logoutBtnIsLoading])

    return (
        <ElevationScroll {...props}>
            <AppBar>
                <Toolbar>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <div className='left'>
                            <Link href="/user">
                                <PersonIcon />
                                <Typography>System User</Typography>
                            </Link>
                        </div>

                        <div className='right'>
                            <Button
                                className='logout-btn'
                                variant='contained'
                                color='error'
                                startIcon={logoutBtnStartIcon}
                                disabled={logoutBtnIsLoading}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>

                    </Stack>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}

export default memo(Header)