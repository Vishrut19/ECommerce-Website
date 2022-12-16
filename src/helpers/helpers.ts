import dompurify from 'dompurify';
import { CleanHtml, Currency, Price, Product } from '../types/data.types';

export const generateId = ():string => {
	return Math.random().toString(16).substring(2, 9);
};

export const getPrice = (product: Product, currency: Currency): Price => {
	const priceCurr: Price | undefined = product.prices.find((p) => {
		return p.currency.label === currency.label;
	});

	if (priceCurr) {
		return priceCurr;
	} else {
		return { currency: currency, amount: 0 };
	}
};

export const createPriceRecord = (
	prices: Price[], 
	currency: Currency): string => {
	let price = 'No price';
	const priceCurr: Price | undefined = prices.find((p) => {
		return p.currency.label === currency.label;
	});
	if (priceCurr) price = (
		priceCurr.currency.symbol + priceCurr.amount.toFixed(2)
		);
	return price;
};


export const toCleanDescription = (description: string): string => {
	return dompurify.sanitize(description, { FORCE_BODY: true });
};
