import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { ClothType } from '../../types/Cloth';

type InitialState = {
  loading: boolean;
  items: ClothType[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  items: [],
  error: '',
};

export const fetchClothes = createAsyncThunk('clothes/fetchClothes', async (_, thunkAPI) => {
  const res = await fetch(process.env.REACT_APP_API + 'items');
  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

const clothesSlice = createSlice({
  name: 'clothes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClothes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchClothes.fulfilled, (state, action: PayloadAction<ClothType[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.error = '';
    });
    builder.addCase(fetchClothes.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = 'Something went wrong.';
    });
  },
});

const clothes = (state: RootState) => state.clothes;

export const clothesAll = createSelector([clothes], (clothes) => clothes);

export const clothesOne = createSelector([clothes, (clothes, id: number) => id], (clothes, id) => clothes.items.find((item) => item._id === id));

export default clothesSlice.reducer;
