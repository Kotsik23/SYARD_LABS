import { Badge, Button, Center, Flex, Heading, HStack, Text, useToast } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../constants/routes"
import { useLogoutMutation } from "../features/auth/auth.api"
import { useAppSelector } from "../hooks/redux"
import { WarningTwoIcon } from "@chakra-ui/icons"
import { ROLES } from "../constants/roles"
import { MdSpaceDashboard } from "react-icons/md"
import UserRoles from "../components/UserRoles"

const getBadgeColor = (name: string) => {
	switch (name) {
		case ROLES.ADMIN: {
			return "telegram"
		}
		case ROLES.MANAGER: {
			return "purple"
		}
		case ROLES.USER: {
			return "gray"
		}
		default: {
			return "gray"
		}
	}
}

const Profile = () => {
	const { user } = useAppSelector(state => state.auth)

	const isAdmin = user?.roles.includes(ROLES.ADMIN)

	const [logout] = useLogoutMutation()
	const navigate = useNavigate()
	const toast = useToast()

	const handleLogout = async () => {
		await logout()
		navigate(ROUTES.AUTH_PAGE)
		toast({
			title: "Successfully logged out.",
			description: "Now you are an anonymous :)",
			status: "info",
			duration: 4000,
			isClosable: true,
		})
	}

	return (
		<Center minH={"93vh"}>
			<Flex direction="column" gap={4} justify="center">
				<Heading size={"xl"} textAlign="center">
					Welcome back, {user?.email}
				</Heading>
				<HStack>
					<Text fontSize={"xl"}>Your Roles: </Text>
					<UserRoles roles={user?.roles!} />
				</HStack>
				{isAdmin && (
					<Button colorScheme={"blue"} as={Link} to={ROUTES.ADMIN.USERS} rightIcon={<MdSpaceDashboard />}>
						Admin Dashboard
					</Button>
				)}
				<Button colorScheme={"red"} onClick={handleLogout} rightIcon={<WarningTwoIcon />}>
					Logout
				</Button>
			</Flex>
		</Center>
	)
}

export default Profile
