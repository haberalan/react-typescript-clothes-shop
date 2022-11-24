import { configureStore } from '@reduxjs/toolkit';

import clothesReducer from '../features/clothes/clothesSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/user/userSlice';
import purchasesSlice from '../features/purchases/purchasesSlice';

const store = configureStore({
  reducer: {
    clothes: clothesReducer,
    cart: cartReducer,
    user: userReducer,
    purchases: purchasesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
