import { configureStore } from '@reduxjs/toolkit';

import clothesReducer from '../features/clothes/clothesSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    clothes: clothesReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
