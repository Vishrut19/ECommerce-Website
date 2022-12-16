import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from './../types/data.types';

interface StatusState {
	modalIsShow: boolean;
	modalContent: Modal;
	category: string;
	currency: Currency;
	cartIsModal: boolean;
	currencyIsShow: boolean;
	cartIsShow: boolean;
	cartPageIsShow: boolean;
}

type Modal = {
	title: string,
	message: string,
};

const initialState: StatusState = {
	modalIsShow: false,
	modalContent: { title: '', message: '' },
	category: '',
	currency: { label: 'USD', symbol: '$' },
	cartIsModal: true,
	currencyIsShow: false,
	cartIsShow: false,
	cartPageIsShow: false,
};

export const statusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		statusChangeCategory: (state, action: PayloadAction<string>) => { 
			state.category = action.payload; 
		},
		statusOnCloseModal: (state) => { state.modalIsShow = false; },
		statusOnShowModal: (state, action: PayloadAction<Modal>) => {
			state.modalIsShow = true;
			state.modalContent = action.payload;
		},
		statusSetCartShow: (state, action: PayloadAction<boolean>) => { 
			state.cartIsShow = action.payload; 
		},
		statusSetCartView: (state, action: PayloadAction<boolean>) => { 
			state.cartIsModal = action.payload; 
		},
		statusSetCurrencyIsShow: (state, action: PayloadAction<boolean>) => { 
			state.currencyIsShow = action.payload; 
		},
		statusSetCurrency: (state, action: PayloadAction<Currency>) => {
			state.currency = action.payload; 
		},
		statusSetCartPageShow: (state, action: PayloadAction<boolean>) => { 
			state.cartPageIsShow = action.payload; 
		},
	}
});

const { actions, reducer } = statusSlice;
export default reducer;
export const {
	statusChangeCategory,
	statusOnCloseModal,
	statusOnShowModal,
	statusSetCartShow,
	statusSetCurrencyIsShow,
	statusSetCurrency,
	statusSetCartView,
	statusSetCartPageShow
} = actions;