import { client, Query, Field } from "@tilework/opus";

import { Category, Product, Currencies } from '../types/data.types';
import { CategoriesNames } from '../types/data.types';

const END_POINT = "http://localhost:4000/graphql";

client.setEndpoint(END_POINT);

export const getCurrencies = async () => {
	const query = new Query<string, Currencies, boolean>("currencies", true)
		.addFieldList([
			"label",
			"symbol",
		]);
	const data = await client.post(query);
	const result:Currencies = JSON.parse(JSON.stringify(data));
	return result;
};

export const getCategories = async () => {
	const query = new Query<string, Category, boolean>("categories", true)
		.addField(new Field("name", true))
		.addField((new Field("products", true))
			.addFieldList([
				"id",
				"name",
				"inStock",
				"gallery",
				"prices{currency{label, symbol}, amount}",
				"brand",
			]));
	const data = await client.post(query);
	const result:CategoriesNames = JSON.parse(JSON.stringify(data));
	return result;
};

export const getCategoriesName = async () => {
	const query = new Query("categories", false)
		.addField(new Field<"name", string[], boolean>("name", true));
	const data = await client.post(query);
	const result:CategoriesNames = JSON.parse(JSON.stringify(data));
	return result;
};

export const getCategory = async (category: string) => {
	const query = (
		new Query<string, {category:Category}, boolean>("category", true))
		.addArgument("input", "CategoryInput", { title: category })
		.addField(new Field("name", true))
		.addField((new Field("products", true))
			.addFieldList([
				"id",
				"name",
				"inStock",
				"gallery",
				"attributes{id, name, type, items{ displayValue, value, id }}",
				"prices{currency{label, symbol}, amount}",
				"brand",
			]));
		const data = await client.post(query);
		const result:{category:Category} = JSON.parse(JSON.stringify(data));
		return result.category.products;

};

export const getProduct = async (id: string) => {
	const query = (
		new Query<string, {product:Product}, boolean>("product", false))
		.addArgument("id", "String!", id)
		.addFieldList([
			"id",
			"name",
			"inStock",
			"gallery",
			"description",
			"category",
			"attributes{id, name, type, items{ displayValue, value, id }}",
			"prices{ currency{ label, symbol }, amount }",
			"brand",
		]);
	const data = await client.post(query);
	const result: {product:Product} = JSON.parse(JSON.stringify(data));
	return result.product;
};