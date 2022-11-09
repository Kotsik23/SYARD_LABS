export interface Brand {
	id: number
	name: string
}

export interface Type {
	id: number
	name: string
}

export interface IProduct {
	id: number
	name: string
	price: number
	image: string
	createdAt: Date
	updatedAt: Date
	typeId: number
	brandId: number
	brand: Brand
	type: Type
}
