import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import { ROLES } from "./constants/roles"
import { ROUTES } from "./constants/routes"
import CheckRoles from "./hoc/CheckRoles"
import GetProfile from "./hoc/GetProfile"
import RequireAuth from "./hoc/RequireAuth"
import AdminDashboard from "./screens/AdminDashboard"
import AuthPage from "./screens/AuthPage"
import Products from "./screens/Products"
import Profile from "./screens/Profile"

const App = () => {
	return (
		<Routes>
			<Route element={<GetProfile />}>
				<Route path={ROUTES.MAIN_PAGE} element={<Layout />}>
					<Route index element={<Products />} />

					<Route path="auth" element={<AuthPage />} />
					<Route element={<RequireAuth />}>
						<Route path="profile" element={<Profile />} />
					</Route>

					<Route path="admin" element={<CheckRoles requiredRoles={[ROLES.ADMIN, ROLES.MANAGER]} />}>
						<Route path={ROUTES.ADMIN.USERS} element={<AdminDashboard />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	)
}

export default App
