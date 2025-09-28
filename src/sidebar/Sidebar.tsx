// Sidebar.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from "@mui/material";

const SidebarItems: { label: string, path: string }[] = [
    {
        label: 'Users',
        path: 'users',
    },
    {
        label: 'Employees',
        path: 'employees',
    },
    {
        label: 'Time Clock',
        path: 'time-clock',
    },

];
export default function Sidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
    const navigate = useNavigate();
    const location = useLocation();
    const activeItem = location.pathname.split('/').pop() || 'users';
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const handleActiveItem = (item: string) => {
        navigate(item);
        if (isMobile && onClose) {
            onClose();
        }
    }

    return (
        <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={onClose}
            sx={{
                display: { xs: 'block', md: 'block' },
                '& .MuiDrawer-paper': {
                    width: '250px',
                    height: isMobile ? '100vh' : 'calc(100vh - 64px)',
                    top: isMobile ? 0 : '64px',
                    position: 'fixed',
                    zIndex: isMobile ? 1300 : 1200,
                },
            }}
        >
            <List sx={{ width: '100%', p: 0, marginTop: 3 }}>
                {SidebarItems.map((item) => (
                    <ListItem
                        key={item.path}
                        disablePadding
                    >
                        <ListItemButton onClick={() => handleActiveItem(item.path)} sx={{
                            width: '100%',
                            backgroundColor: item.path === activeItem ? '#1952A0' : 'transparent',
                            color: item.path === activeItem ? 'white' : 'black',
                            '&:hover': {
                                backgroundColor: item.path === activeItem ? '#1952A0' : 'rgba(0,0,0,0.04)',
                                color: item.path === activeItem ? 'white' : 'black',
                            },
                        }}>
                            <ListItemText primary={item.label} sx={{ color: item.path === activeItem ? 'white' : 'black' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Drawer >
    );
}
