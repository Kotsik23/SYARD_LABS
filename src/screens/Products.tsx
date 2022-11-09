import {
	Button,
	Center,
	Container,
	Flex,
	Heading,
	IconButton,
	Select,
	SimpleGrid,
	Spinner,
	Tooltip,
} from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"
import { SearchIcon } from "@chakra-ui/icons"
import { GrPowerReset } from "react-icons/gr"
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi"
import { useGetAllBrandsQuery } from "../features/brands/brands.api"
import { useGetAllProductsQuery } from "../features/products/products.api"
import { useGetAllTypesQuery } from "../features/types/types.api"
import { ChangeEvent, useState } from "react"
import { ISearchParams } from "../features/products/search-params.interface"

const initialSearchParams: ISearchParams = {
	brand: "",
	type: "",
	order: undefined,
}

const Products = () => {
	const [type, setType] = useState("")
	const [brand, setBrand] = useState("")
	const [order, setOrder] = useState<"asc" | "desc" | undefined>(undefined)

	const [searchParams, setSearchParams] = useState<ISearchParams>(initialSearchParams)

	const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setType(e.target.value)
	}

	const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setBrand(e.target.value)
	}

	const handleSearch = () => {
		setSearchParams({
			brand,
			type,
			order,
		})
	}

	const toggleSorting = () => {
		if (order === "asc") {
			setOrder("desc")
		}
		if (order === "desc") {
			setOrder("asc")
		}
		if (!order) {
			setOrder("asc")
		}
	}

	const resetSearchParams = () => {
		setSearchParams(initialSearchParams)
		setType("")
		setBrand("")
		setOrder(undefined)
	}

	const { data: products, isLoading } = useGetAllProductsQuery(searchParams)

	const { data: brands, isLoading: brandsLoading } = useGetAllBrandsQuery()
	const { data: types, isLoading: typesLoading } = useGetAllTypesQuery()

	if (isLoading || brandsLoading || typesLoading)
		return (
			<Center minH={"94vh"}>
				<Spinner size={"md"} />
			</Center>
		)

	return (
		<Container maxW="container.xl" my={14}>
			<Heading
				size="2xl"
				textDecorationThickness={"from-font"}
				textDecoration="underline"
				textDecorationColor="gray.400"
				textUnderlineOffset={10}
				mb={10}
			>
				Products
			</Heading>
			<Flex align={"center"} gap={3} direction={["column", null, "row"]} mb={6}>
				<Select placeholder="Select brand" value={brand} onChange={handleBrandChange}>
					{brands?.map(brand => (
						<option key={brand.id} value={brand.name}>
							{brand.name}
						</option>
					))}
				</Select>

				<Select placeholder="Select type" value={type} onChange={handleTypeChange}>
					{types?.map(type => (
						<option key={type.id} value={type.name}>
							{type.name}
						</option>
					))}
				</Select>

				<Button
					flexShrink={1.3}
					w="full"
					colorScheme={"facebook"}
					rightIcon={<SearchIcon />}
					onClick={handleSearch}
				>
					Search
				</Button>
				<Tooltip label={order} aria-label="A tooltip">
					<IconButton
						colorScheme={"facebook"}
						variant={order ? "solid" : "outline"}
						fontSize={20}
						icon={order === "asc" ? <HiOutlineSortAscending /> : <HiOutlineSortDescending />}
						aria-label={"sorting"}
						onClick={toggleSorting}
					/>
				</Tooltip>
				<IconButton
					colorScheme={"facebook"}
					variant="outline"
					icon={<GrPowerReset />}
					aria-label={"reset search params"}
					onClick={resetSearchParams}
				/>
			</Flex>

			{products?.length ? (
				<SimpleGrid columns={[1, null, 2, 3, 4]} spacing={30}>
					{products?.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</SimpleGrid>
			) : (
				<Heading size={"xl"} textAlign="center" mt={[6, 12]}>
					Nothing was found...
				</Heading>
			)}
		</Container>
	)
}

export default Products
