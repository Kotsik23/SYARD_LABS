import { IUser } from "./user.interface"

export interface IAuthState {
	accessToken?: string | null
	user?: IUser | null
}
