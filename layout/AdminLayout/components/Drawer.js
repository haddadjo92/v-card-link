import { useRouter } from 'next/router'
import { useState } from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, } from '@mui/material'
// *** Components ***
import ChangePasswordModal from '@/components/user/pages/changePasswordModal'
// *** Icons ***
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QrCodeIcon from '@mui/icons-material/QrCode';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
// *** styles ***
import { styled } from '@mui/material/styles';
import { useCallback, useMemo } from 'react';
const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));



const DrawerList = [
    {
        id: 'user-management',
        title: "User Management",
        href: "/admin/user-management",
        icon: GroupsIcon
    },
    {
        id: 'reports',
        title: "Reports",
        href: "/admin/reports",
        icon: AssignmentIcon
    },
    {
        id: 'qr-code-generator',
        title: "QR Code Generator",
        href: "/admin/qr-code-generator",
        icon: QrCodeIcon
    },
    {
        id: 'change-password',
        title: "Change Password",
        href: "change-password",
        icon: KeyRoundedIcon
    }
]

export default function PersistentDrawerRight({ open, onClose }) {
    const router = useRouter()
    const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false)

    // ****************** Callbacks ******************
    const handleCloseChangePasswordModal = useCallback(() => setChangePasswordIsOpen(false), [])
    const handleListItemButtonClick = useCallback((event) => {
        const href = event.target.getAttribute("data-href")

        if (href === "change-password")
            setChangePasswordIsOpen(true)
        else router.push(href)

        onClose()
    }, [onClose, router])

    // ****************** Memos ******************
    const listItemButtonSX = useMemo(() => ({ "& *": { pointerEvents: "none" } }), [])
    const drawerSX = useMemo(() => {
        return {
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
            },
        }
    }, [])

    return (
        <>
            <ChangePasswordModal
                open={changePasswordIsOpen}
                onClose={handleCloseChangePasswordModal}
            />

            <Drawer
                sx={drawerSX}
                variant="temporary"
                anchor="right"
                open={open}
                onClose={onClose}
            >
                <DrawerHeader>
                    <IconButton onClick={onClose}>
                        <ChevronRightIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {DrawerList.map(({ id, title, href, icon: Icon }, index) => (
                        <ListItem key={`drawer-item-${id}`} disablePadding>
                            <ListItemButton sx={listItemButtonSX} data-href={href} onClick={handleListItemButtonClick}>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}