import { IUser } from "../../shared/interfaces/user.interface"
import { apiSlice } from "../../store/api/api.slice"

const usersApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAllUsers: build.query<IUser[], void>({
			query: () => ({
				url: "/users",
				method: "GET",
			}),
		}),

		getUserById: build.query<IUser, number>({
			query: (userId: number) => ({
				url: `/users/${userId}`,
				method: "GET",
			}),
		}),
	}),
})

export const { useGetAllUsersQuery, useLazyGetUserByIdQuery } = usersApi
