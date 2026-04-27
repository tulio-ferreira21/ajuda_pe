import { useEffect, useState } from "react";
import { api } from "../services/api/api";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    useEffect(() => {
        api.get('/users/me', { withCredentials: true })
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false))
    }, [])
    if (isAuth === null) return <p className="text-2xl font-space-grotesk font-light">Carregando...</p>
    if (!isAuth) {
        toast.error('Sessão expirada', { toastId: "error" })
        return <Navigate to={'/auth'} />
    }
    return children
}