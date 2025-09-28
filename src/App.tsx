import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const Loading = lazy(() => import('./components/Loading'))
const LoginPage = lazy(() => import('./components/form/Login'))
const AuthLayout = lazy(() => import('./auth/AuthLayout'))
const MianDashboard = lazy(() => import('./dashboard/MianDashboard'))
const UserDashboard = lazy(() => import('./dashboard/users/UserDashboard'))
const EmployeeDashboard = lazy(() => import('./dashboard/employees/EmployeeDashboard'))
const TimeClockDashboard = lazy(() => import('./dashboard/timeClock/TimeClockDashboard'))

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/dashboard" element={<AuthLayout />}>
            <Route element={<MianDashboard />}>
              <Route index element={<Navigate to="users" replace />} />
              <Route path="users" element={<UserDashboard />} />
              <Route path="employees" element={<EmployeeDashboard />} />
              <Route path="time-clock" element={<TimeClockDashboard />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
