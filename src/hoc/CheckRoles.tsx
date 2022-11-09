import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "../constants/routes"
import { useAppSelector } from "../hooks/redux"

const CheckRoles = ({ requiredRoles }: { requiredRoles: string[] }) => {
	const { user } = useAppSelector(state => state.auth)

	const isAccess = user?.roles.some(role => requiredRoles.includes(role))

	return isAccess ? <Outlet /> : <Navigate to={ROUTES.MAIN_PAGE} />
}

export default CheckRoles
