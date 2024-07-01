import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useState, cloneElement, useMemo, useCallback } from 'react'
import { AppBar, Toolbar, IconButton, Button, Stack, CircularProgress, Typography, useScrollTrigger } from '@mui/material';
// *** api ***
import axiosClient from '@/api/axiosClient'
// *** Icons ***
import { useDispatch } from 'react-redux'
import { logout } from '@/store/reducers/authReducer'
// *** Icons ***
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu'
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
        axiosClient.delete("/api/auth/logout")
            .then(res => {
                dispatch(logout())
                router.push("/login")
            })
            .catch(error => {
                console.log("error: ", error);
            })
            .finally(() => setLogoutBtnIsLoading(false))
    }, [dispatch, router])


    // ****************** Memos ******************
    const logoutBtnStartIcon = useMemo(() => { return logoutBtnIsLoading ? <CircularProgress size={18} sx={{ color: "#FFF" }} /> : <LogoutIcon /> }, [logoutBtnIsLoading])

    return (
        <ElevationScroll {...props}>
            <AppBar>
                <Toolbar>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <div className='left'>
                            <Link href="/admin">
                                <PersonIcon />
                                <Typography>System Admin</Typography>
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

                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={props?.onOpenDrawer}>
                                <MenuIcon />
                            </IconButton>
                        </div>

                    </Stack>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}

export default memo(Header)