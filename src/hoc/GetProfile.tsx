import { Center, Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useGetProfileMutation } from "../features/auth/auth.api"

const GetProfile = () => {
	const [getProfile, { isLoading: isProfileLoading }] = useGetProfileMutation()

	useEffect(() => {
		getProfile()
	}, [])

	return isProfileLoading ? (
		<Center minH="94vh">
			<Spinner size="lg" />
		</Center>
	) : (
		<Outlet />
	)
}

export default GetProfile
