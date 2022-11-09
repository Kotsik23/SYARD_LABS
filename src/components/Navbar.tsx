import { Box, Container, Flex, Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { ROUTES } from "../constants/routes"
import { useAppSelector } from "../hooks/redux"

const Navbar = () => {
	const { user } = useAppSelector(state => state.auth)

	return (
		<Box as="header" bg={"facebook.400"}>
			<Container maxW={"container.xl"}>
				<Flex
					py={3}
					align={"center"}
					justify="center"
					gap={10}
					sx={{
						"& > a": {
							fontWeight: "semibold",
							fontSize: "lg",
							color: "white",
						},
					}}
				>
					<Link as={RouterLink} to={ROUTES.MAIN_PAGE}>
						Main
					</Link>
					{user && (
						<Link as={RouterLink} to={ROUTES.PROFILE}>
							Profile
						</Link>
					)}
					{!user && (
						<Link as={RouterLink} to={ROUTES.AUTH_PAGE}>
							Auth
						</Link>
					)}
				</Flex>
			</Container>
		</Box>
	)
}

export default Navbar
