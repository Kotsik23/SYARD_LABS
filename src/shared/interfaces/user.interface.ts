export interface IUser {
	id: number
	email: string
	passwordHash: string
	refreshTokenHash: string
	roles: string[]
	isBanned: boolean
	createdAt: string
	updatedAt: string
}
