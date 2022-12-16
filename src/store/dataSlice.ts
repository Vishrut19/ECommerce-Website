import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as ApiServices from '../sevices/api-services';
import { 
	Product, 
	Currency, 
	CategoriesNames, 
	Currencies } from '../types/data.types';


interface DataState {
	errorMessage?:string;
	statusFetchingName: string;
	statusFetchingCategory: string;
	statusFetchingProduct: string;
	statusFetchingCurrencies: string;
	currentCategory: string,
	categories: string[],
	categorySet: Product[],
	product: Product,
	currencies: Currency[]
}

export const getCategoriesName 
	= createAsyncThunk<CategoriesNames, undefined, {rejectValue:string}>(
	'data/getCategoriesName',
	async (_, {rejectWithValue}) => {
			try {const data = await ApiServices.getCategoriesName();
				return data;
			} catch {
				return rejectWithValue('Error loading category names');
			}
	}
);

export const getCategorySet 
	= createAsyncThunk<Product[], string, {rejectValue:string}>(
	'data/getCategorySet',
	async (category, {rejectWithValue}) => {
	try {
		const data:Product[] = await ApiServices.getCategory(category);
		return data;
	} catch (e) {
		return (rejectWithValue('Error loading products'));
	}
}
);

export const getProduct 
= createAsyncThunk<Product, string, {rejectValue:string}>(
	'data/getProduct',
	async (id: string, {rejectWithValue}) => {
		try {	
			const data:Product = await ApiServices.getProduct(id);
			if (!data) return (rejectWithValue('Error loading product'));
			return data;
		} catch {
			return (rejectWithValue('Error loading product'));
		}
	}
);


export const getCurrencies 
	= createAsyncThunk<Currencies, undefined, {rejectValue:string}>(
	'data/getCurrencies',
	async (_, {rejectWithValue} ) => {
		try{ const data:Currencies = await ApiServices.getCurrencies();
			return data;
		}catch {
			return rejectWithValue('Error loading currencies');
		}
}
);

const initialState: DataState = {
	errorMessage:'',
	statusFetchingName: 'idle',
	statusFetchingCategory: 'idle',
	statusFetchingProduct: 'idle',
	statusFetchingCurrencies: 'idle',
	currentCategory: '',
	categories: [],
	categorySet: [],
	product: {
		id: 'none',
		name: 'none',
		inStock: true,
		gallery: [''],
		description: '',
		category: 'All',
		attributes: [],
		prices: [{ currency: { label: 'USD', symbol: '$' }, amount: 0 }],
		brand: 'none'
	},
	currencies: [{ label: 'USD', symbol: '$' }]
};

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setCurrentCategory: (state, action: PayloadAction<string>) => {
			state.currentCategory = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder

			.addCase(getCategoriesName.pending, state => { 
				state.statusFetchingName = 'loading'; 
			})
			
			.addCase(getCategoriesName.rejected,  (state, action) => { 
				state.errorMessage=action.payload;
				state.statusFetchingName = 'error'; 
			})

			.addCase(getCategoriesName.fulfilled, (state, action) => {
				state.statusFetchingName = 'idle';
				state.categories = action.payload.categories.map(el => el.name);
			})

			.addCase(getCategorySet.pending, state => { 
				state.statusFetchingCategory = 'loading'; 
			})

			.addCase(getCategorySet.rejected, (state, action) => { 
				state.errorMessage=action.payload;
				state.statusFetchingCategory = 'error'; 
			})

			.addCase(getCategorySet.fulfilled, (state, action) => {
				state.statusFetchingCategory = 'idle';
				state.categorySet = action.payload;
			})

			.addCase(getProduct.pending, state => { 
				state.statusFetchingProduct = 'loading'; 
			})

			.addCase(getProduct.rejected,  (state, action) => { 
				state.errorMessage=action.payload;
				state.statusFetchingProduct = 'error'; })

			.addCase(getProduct.fulfilled, (state, action) => {
				state.statusFetchingProduct = 'idle';
				state.product = action.payload;
			})

			.addCase(getCurrencies.pending, state => { 
				state.statusFetchingCurrencies = 'loading'; 
			})

			.addCase(getCurrencies.rejected, (state, action) => { 
				state.errorMessage=action.payload;
				state.statusFetchingCurrencies = 'error'; 
			})

			.addCase(getCurrencies.fulfilled, (state, action) => {
				state.currencies = action.payload.currencies;
				state.statusFetchingCurrencies = 'idle';
			});
	}
});

export const { setCurrentCategory } = dataSlice.actions;
export default dataSlice.reducer;
