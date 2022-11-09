import { Brand } from "../../shared/interfaces/product.interface"
import { apiSlice } from "../../store/api/api.slice"

const brandsApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAllBrands: build.query<Brand[], void>({
			query: () => ({
				url: `/brands`,
				method: "GET",
			}),
			providesTags: result => {
				if (result) {
					return [...result.map(({ id }) => ({ type: "BRANDS", id } as const)), { type: "BRANDS", id: "LIST" }]
				} else return [{ type: "BRANDS", id: "LIST" }]
			},
		}),
	}),
})

export const { useGetAllBrandsQuery } = brandsApi
