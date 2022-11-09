import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Container, Heading, Center, Spinner } from "@chakra-ui/react"
import { useGetAllUsersQuery } from "../features/users/users.api"
import DashboardUserRow from "./DashboardUserRow"

const AdminDashboard = () => {
	const { data: users, isLoading } = useGetAllUsersQuery()

	if (isLoading)
		return (
			<Center minH="94vh">
				<Spinner size="md" />
			</Center>
		)

	return (
		<Container maxW={"container.lg"} my={14}>
			<Heading size="xl" mb={6} textAlign="center">
				Users Dashboard
			</Heading>
			<TableContainer>
				<Table size="md">
					<Thead>
						<Tr>
							<Th>Id</Th>
							<Th>Email</Th>
							<Th>Is Banned</Th>
							<Th>Roles</Th>
						</Tr>
					</Thead>
					<Tbody>
						{users?.map(user => (
							<DashboardUserRow key={user.id} user={user} />
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default AdminDashboard
