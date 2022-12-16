import { configureStore } from '@reduxjs/toolkit';

import statusReducer from './statusSlice';
import dataReducer from './dataSlice';
import cartReducer from './cartSlice';

const store = configureStore({
	reducer: {
		status: statusReducer,
		data: dataReducer,
		cart: cartReducer
	},
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;