import { Box, Button, Toolbar, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { AppBar } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleLogout = async () => {
        const singout = await signOut(auth);
        console.log(singout);
        navigate('/');
    }
    return (
        <AppBar variant="elevation" elevation={0} component='header' sx={{ backgroundColor: '#1952A0', }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={onMenuClick}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant={isSmallMobileScreen ? 'body1' : 'h4'} component={isSmallMobileScreen ? 'span' : 'h1'}>Vederra OS</Typography>
                </Box>
                <Box>
                    <Typography variant={isSmallMobileScreen ? 'body1' : 'h5'} component={isSmallMobileScreen ? 'span' : 'h2'}>Welcome, Jhone Doe</Typography>
                </Box>
                <Box>
                    <Button color="primary" onClick={handleLogout} sx={{ color: 'white', textDecoration: 'underline' }} >Logout</Button>
                </Box>

            </Toolbar>
        </AppBar>
    )
}
