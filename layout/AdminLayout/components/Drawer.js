import { useRouter } from 'next/router'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, } from '@mui/material'
// *** Icons ***
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QrCodeIcon from '@mui/icons-material/QrCode';
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
]

export default function PersistentDrawerRight({ open, onClose }) {
    const router = useRouter()

    // ****************** Callbacks ******************
    const handleListItemButtonClick = useCallback((event) => {
        const href = event.target.getAttribute("data-href")
        router.push(href)
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
        <Drawer
            sx={drawerSX}
            variant="persistent"
            anchor="right"
            open={open}
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
    );
}