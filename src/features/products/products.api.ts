import { IProduct } from "../../shared/interfaces/product.interface"
import { apiSlice } from "../../store/api/api.slice"
import { ISearchParams } from "./search-params.interface"

const productsApi = apiSlice.injectEndpoints({
	endpoints: build => ({
		getAllProducts: build.query<IProduct[], ISearchParams>({
			query: ({ brand, type, order }) => ({
				url: `/products`,
				method: "GET",
				params: {
					brand,
					type,
					order,
				},
			}),
			providesTags: result => {
				if (result) {
					return [...result.map(({ id }) => ({ type: "PRODUCT", id } as const)), { type: "PRODUCT", id: "LIST" }]
				} else return [{ type: "PRODUCT", id: "LIST" }]
			},
		}),
	}),
})

export const { useGetAllProductsQuery } = productsApi
