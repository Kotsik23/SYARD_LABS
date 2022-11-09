import { Type } from "../../shared/interfaces/product.interface"
import { apiSlice } from "../../store/api/api.slice"

const typesApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAllTypes: build.query<Type[], void>({
			query: () => ({
				url: `/types`,
				method: "GET",
			}),
			providesTags: result => {
				if (result) {
					return [...result.map(({ id }) => ({ type: "TYPES", id } as const)), { type: "TYPES", id: "LIST" }]
				} else return [{ type: "TYPES", id: "LIST" }]
			},
		}),
	}),
})

export const { useGetAllTypesQuery } = typesApi
