import { AspectRatio, Box, Button, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react"
import { FC } from "react"
import { currencyFormatter } from "../shared/currencyFormatter"
import { IProduct } from "../shared/interfaces/product.interface"
import { IoMdCart } from "react-icons/io"

const ProductCard: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<Box rounded="2xl" bg={"gray.50"} shadow="md">
			<Flex p={5} direction="column">
				<AspectRatio ratio={1} maxW={"full"} mb={5}>
					<Image rounded={"xl"} src={product.image} alt={`${product.id}-${product.name}`} />
				</AspectRatio>
				<Heading size={"md"} mb={2} noOfLines={1}>
					{product.name}
				</Heading>
				<HStack spacing={4} mb={2}>
					<Button variant={"link"}>{product.brand.name}</Button>
					<Button variant={"link"}>{product.type.name}</Button>
				</HStack>
				<Flex align={"center"} justify="space-between">
					<Text fontSize={"lg"}>{currencyFormatter.format(product.price)}</Text>
					<Button colorScheme={"facebook"} rightIcon={<IoMdCart />}>
						Buy
					</Button>
				</Flex>
			</Flex>
		</Box>
	)
}

export default ProductCard
