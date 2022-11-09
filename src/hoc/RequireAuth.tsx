import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROUTES } from "../constants/routes"
import { useAppSelector } from "../hooks/redux"

const RequireAuth = () => {
	const location = useLocation()

	const { user } = useAppSelector(state => state.auth)

	return user ? <Outlet /> : <Navigate to={ROUTES.AUTH_PAGE} state={{ from: location }} />
}

export default RequireAuth
