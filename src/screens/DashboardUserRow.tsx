import { Td, Tr } from "@chakra-ui/react"
import { FC } from "react"
import UserRoles from "../components/UserRoles"
import { IUser } from "../shared/interfaces/user.interface"

const DashboardUserRow: FC<{ user: IUser }> = ({ user }) => {
	return (
		<Tr>
			<Td textAlign={"start"}>{user.id}</Td>
			<Td>{user.email}</Td>
			<Td>{user.isBanned.toString()}</Td>
			<Td>
				<UserRoles roles={user.roles} />
			</Td>
		</Tr>
	)
}

export default DashboardUserRow
