import { useAuth } from "../context/AuthContext"
import { Navigate } from 'react-router-dom'


//Da una ruta segura si el usuario esta registrado
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return <p>Loading...</p>
    if (!user) return <Navigate to='/login' />;

    return <>{children}</>
}
export { ProtectedRoute }