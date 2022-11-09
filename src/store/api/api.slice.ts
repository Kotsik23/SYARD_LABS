import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from ".."
import { authActions } from "../../features/auth/auth.slice"

const SERVER_URL = process.env.REACT_APP_SERVER_API

const baseUrl = `${SERVER_URL}/api`

const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).auth.accessToken

		if (accessToken) {
			headers.set("authorization", `Bearer ${accessToken}`)
		}
		return headers
	},
})

const baseQueryWithRefresh = async (args: any, api: BaseQueryApi, extraOptions: {}) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401) {
		console.log("Sending refresh token")

		const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)

		if (refreshResult?.data) {
			const { user } = (api.getState() as RootState).auth
			api.dispatch(authActions.setCredentials({ user, ...refreshResult.data }))

			result = await baseQuery(args, api, extraOptions)
		} else {
			if (refreshResult?.error?.status === 401) {
				console.log("Your login has expired.")
			}
			return refreshResult
		}
	}

	return result
}

export const apiSlice = createApi({
	reducerPath: "api/slice",
	baseQuery: baseQueryWithRefresh,
	endpoints: build => ({}),
	tagTypes: ["USER", "PRODUCT", "TYPES", "BRANDS"],
})
