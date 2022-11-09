import { IAuthResponse } from "../../shared/interfaces/auh-response.interface"
import { IAuthFields } from "../../shared/interfaces/auth-fields.interface"
import { IUser } from "../../shared/interfaces/user.interface"
import { RootState } from "../../store"
import { apiSlice } from "../../store/api/api.slice"
import { authActions } from "./auth.slice"

const authApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		register: build.mutation<IAuthResponse, IAuthFields>({
			query: body => ({
				url: "/auth/register",
				method: "POST",
				body,
			}),
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled
					api.dispatch(authActions.setCredentials(data))
				} catch (error) {
					console.log(error)
				}
			},
		}),

		login: build.mutation<IAuthResponse, IAuthFields>({
			query: body => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled

					api.dispatch(authActions.setCredentials(data))
				} catch (error) {
					console.log(error)
				}
			},
		}),

		getProfile: build.mutation<{ user: IUser }, void>({
			query: () => ({
				url: "/auth/profile",
				method: "GET",
			}),
			async onQueryStarted(arg, api) {
				try {
					const { data } = await api.queryFulfilled

					const { accessToken } = (api.getState() as RootState).auth
					api.dispatch(authActions.setCredentials({ accessToken, user: data.user }))
				} catch (error) {
					console.log(error)
				}
			},
		}),

		logout: build.mutation<{ message: string }, void>({
			query: () => ({
				url: "/auth/profile",
				method: "POST",
			}),
			async onQueryStarted(arg, api) {
				try {
					await api.queryFulfilled
					api.dispatch(authActions.logout())
				} catch (error) {
					console.log(error)
				}
			},
		}),
	}),
})

export const { useRegisterMutation, useLoginMutation, useGetProfileMutation, useLogoutMutation } = authApi
