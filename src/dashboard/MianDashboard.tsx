import { Suspense, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../context/AppContext';
import Navbar from './Navbar';
import { Box } from '@mui/material';
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';





export default function MianDashboard() {
  const { isUser } = useContext(AppContext) as AppContextType;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log(isUser);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
      <Navbar onMenuClick={handleDrawerToggle} />
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
        <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <Box sx={{
          flex: 1,
          padding: 4,
          marginTop: 7,
          overflow: 'auto',
          marginLeft: { xs: 0, md: '250px' },
          minHeight: '100%'
        }}>
          <Box sx={{ overflow: 'auto' }}>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
