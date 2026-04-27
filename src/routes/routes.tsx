import { Route, Routes } from 'react-router-dom'
import Main from '../pages/landing/page'
import Auth from '../pages/auth/page'
import VerifyCode from '../pages/auth/validCode'
import { ProtectedLayout } from './ProtectedLayout'
import Dashboard from '../pages/authenticated/dashboard/page'
import Layout from './Layout'
import Profile from '../pages/authenticated/profile/page'
import EmergencyForm from '../pages/authenticated/emergency-form/EmergencyForm'
import PageRequest from '../pages/authenticated/emergency-form/page'
export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/auth/verify-code' element={<VerifyCode />} />
            <Route element={<ProtectedLayout />}>
                <Route element={<Layout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
                <Route path='/help/:id' element={<PageRequest />} />
                <Route path='/emergency' element={<EmergencyForm />} />
                <Route path='/profile' element={<Profile />} />
            </Route>
        </Routes>
    )
}