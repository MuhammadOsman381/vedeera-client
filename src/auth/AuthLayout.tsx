import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
const Loading = lazy(() => import('../components/Loading'));

export default function AuthLayout() {
    const { isUser, isAuthLoading } = useContext(AppContext) as AppContextType;
    if (isAuthLoading) {
        return <Loading />
    }
    if (!isUser) {
        return <Navigate to="/" />
    }
    console.log(isUser);
    return (
        <Box>
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </Box>
    )
}
