import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { generateId } from '../helpers/helpers';
import * as ApiServices from '../sevices/api-services';

import { CartProduct, Product, SelectedAttr } from '../types/data.types';

interface CartState {
	products: CartProduct[];
	quantity: number;
	isAdded: 'ok' | 'error';
}

let initialState: CartState = {
	products: [],
	quantity: 0,
	isAdded: 'ok'
};

const cartFromLocalStorage = localStorage.getItem('cart');
if (cartFromLocalStorage) initialState = JSON.parse(cartFromLocalStorage);

const calculateQuantity = (state: CartState) => {
	let quantity = 0;
	state.products.forEach(prod => quantity += prod.count);
	return quantity;
};

export const addToCartThunk 
	= createAsyncThunk<void, { 
		attr?: SelectedAttr, 
		idProd: string 
	}, { 
		state: RootState 
	}>(
	'cart/addToCartThunk',
	async (arg, thunkAPI) => {
		const { attr, idProd } = arg;
		const attrDefault:SelectedAttr = {};
		const productInput: Product = await ApiServices.getProduct(idProd);
		if (!attr) {
			productInput.attributes?.forEach((el)=>{
				attrDefault[el.name] = el.items[0];
			});
		}

		const id = generateId();
		const productToCart: CartProduct = {
			id: id,
			count: 1,
			product: productInput,
			selectedAttr: attr ? attr : attrDefault
		};
		const productsInCart = thunkAPI.getState().cart.products;
		if (productsInCart.length === 0) {
			thunkAPI.dispatch(addProductToCart(productToCart));
		} else {
			const prodSameName: CartProduct[] = productsInCart.filter(
					(prodIn) => prodIn.product['id'] === productInput['id']);
			if (prodSameName.length === 0) {
				thunkAPI.dispatch(addProductToCart(productToCart));
			} else {
				if (!attr) {
					thunkAPI.dispatch(updateProductInCart({ 
						id: prodSameName[0].id, 
						value: 1 
					}));
					return;
				}
				let isExistInCart = false;
				prodSameName.forEach((prodIn) => {
					const attrInCart = prodIn.selectedAttr;
					const attrToCart = attr;
					const arrOfAttrInCart = [];
					const strAttrToCart = [];
					for (const key in attrInCart) {
						arrOfAttrInCart.push(JSON.stringify(attrInCart[key]));
						strAttrToCart.push(JSON.stringify(attrToCart[key]));
					}
					const isEqual = (
						arrOfAttrInCart.join('') === strAttrToCart.join('')
						);
					if (isEqual) {
						isExistInCart = true;
						thunkAPI.dispatch(updateProductInCart({ 
							id: prodIn.id, 
							value: 1 
						}));
						return;
					}
				});
				if (!isExistInCart) {
					thunkAPI.dispatch(addProductToCart(productToCart));
				}

			}
		}
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: (state) => {
			state.products = [];
			state.quantity = 0;
			localStorage.setItem('cart', JSON.stringify(state));
		},
		addProductToCart: (state, action: PayloadAction<CartProduct>) => {
			state.products.push(action.payload);
			state.quantity = calculateQuantity(state);
			localStorage.setItem('cart', JSON.stringify(state));
		},
		deleteProductFromCart: (state, action: PayloadAction<string>) => {
			state.products = state.products.filter((prod: CartProduct) => {
				return !(prod.id === action.payload);
			});
			state.quantity = calculateQuantity(state);
			localStorage.setItem('cart', JSON.stringify(state));
		},
		updateProductInCart: (
			state, 
			action: PayloadAction<{ id: string, value: number }>) => {
			state.products = state.products.map((prod: CartProduct) => {
				if (prod.id === action.payload.id) {
					prod.count += action.payload.value;
					return (prod);
				}
				return prod;
			});
			state.quantity = calculateQuantity(state);
			localStorage.setItem('cart', JSON.stringify(state));

		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCartThunk.fulfilled, state => { 
				state.isAdded = 'ok'; 
			})
			.addCase(addToCartThunk.rejected, state => { 
				state.isAdded = 'error'; 
			});
	}
});

const { actions, reducer } = cartSlice;
export default reducer;
export const {
	addProductToCart,
	deleteProductFromCart,
	updateProductInCart,
	clearCart,
} = actions;