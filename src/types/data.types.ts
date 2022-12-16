
export interface Attribute {
	displayValue: string,
	value: string,
	id: string
}

export interface AttributeSet {
	id: string,
	name: string,
	type: string,
	items: Attribute[]
}

export interface Product {
	id: string,
	name: string,
	inStock: boolean,
	gallery: string[],
	description?: string,
	category?: string,
	attributes?: AttributeSet[],
	prices: Price[],
	brand: string
}

export interface Category {
	name: string,
	products: Product[]
}

export interface Currency {
	label: string,
	symbol: string
}

export interface Price {
	currency: Currency,
	amount: number
}
export interface CartProduct {
	id: string;
	count: number;
	product: Product;
	selectedAttr?: SelectedAttr;
}

export interface SelectedAttr {
	[name: string]: Attribute
}

export interface CategoriesNames {
	categories: {name: string}[];
}

export interface Currencies {
	currencies: Currency[]
}

export interface CleanHtml {
	__html: string
}