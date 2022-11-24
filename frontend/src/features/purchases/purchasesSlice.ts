import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { PurchaseType } from '../../types/Purchase';

type InitialState = {
  loading: boolean;
  items: PurchaseType[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  items: [],
  error: '',
};

type fetchPurchasesArgs = {
  token: string;
};

export const fetchPurchases = createAsyncThunk('purchases/fetchPurchases', async ({ token }: fetchPurchasesArgs, thunkAPI) => {
  const res = await fetch(process.env.REACT_APP_API + 'purchase/all', {
    headers: {
      Authorization: `Baerer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPurchases.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPurchases.fulfilled, (state, action: PayloadAction<PurchaseType[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.error = '';
    });
    builder.addCase(fetchPurchases.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = 'Something went wrong.';
    });
  },
});

const purchases = (state: RootState) => state.purchases;

export const purchasesStatus = createSelector([purchases], (purchases) => purchases);

export const purchasesAll = createSelector([purchases], (purchases) => purchases.items);

export const purchaseOne = createSelector([purchases, (purchases, id: number) => id], (purchases, id) => purchases.items.find((item) => item._id === id));

export default purchasesSlice.reducer;
