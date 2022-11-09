import { Badge, HStack } from "@chakra-ui/react"
import { FC } from "react"
import { ROLES } from "../constants/roles"

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

const UserRoles: FC<{ roles: string[] }> = ({ roles }) => {
	return (
		<HStack flexWrap={"wrap"}>
			{roles.map((role, idx) => (
				<Badge key={idx} variant="subtle" colorScheme={getBadgeColor(role)} fontSize={"xl"}>
					{role}
				</Badge>
			))}
		</HStack>
	)
}

export default UserRoles
