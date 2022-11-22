import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CartType } from '../../types/Cart';

type InitialState = {
  items: CartType[];
};

const initialState: InitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ _id: number; size: string }>) => {
      const { _id, size } = action.payload;

      const index = state.items.findIndex((item) => item._id === _id && item.size === size);

      if (index !== -1) {
        state.items[index].amount++;
      } else {
        state.items.push({ _id, size, amount: 1 });
      }

      localStorage.setItem('CLOTHES-SHOP_cart', JSON.stringify(state.items));
    },
    remove: (state, action: PayloadAction<{ _id: number; size: string }>) => {
      const { _id, size } = action.payload;

      const index = state.items.findIndex((item) => item._id === _id && item.size === size);

      if (index === -1) {
        console.log('There is none');
      } else if (state.items[index].amount > 1) {
        state.items[index].amount--;
      } else {
        state.items.splice(index, 1);
      }

      localStorage.setItem('CLOTHES-SHOP_cart', JSON.stringify(state.items));
    },
    setCart: (state, action: PayloadAction<CartType[]>) => {
      state.items = action.payload;
    },
  },
});

const cart = (state: RootState) => state.cart;

export const cartAll = createSelector([cart], (cart) => cart);

export default cartSlice.reducer;
export const { add, remove, setCart } = cartSlice.actions;
