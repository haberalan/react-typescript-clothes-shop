import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { UserType } from '../../types/User';

type InitialState = {
  loading: boolean;
  token: string;
  user: UserType | null;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  token: '',
  user: null,
  error: '',
};

export const loginUser = createAsyncThunk('user/login', async (payload: { email: string; password: string }, thunkAPI) => {
  const { email, password } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

export const signupUser = createAsyncThunk('user/signup', async (payload: { email: string; phone: string; password: string }, thunkAPI) => {
  const { email, phone, password } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, phone, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; user: UserType }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem('CLOTHES-SHOP_token', JSON.stringify(state.token));
      localStorage.setItem('CLOTHES-SHOP_user', JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.token = '';
      state.user = null;

      localStorage.setItem('CLOTHES-SHOP_token', JSON.stringify(''));
      localStorage.setItem('CLOTHES-SHOP_user', JSON.stringify(null));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      userSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(signupUser.fulfilled, (state, action: PayloadAction<{ token: string; user: UserType }>) => {
      state.loading = false;
      state.error = '';

      userSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const getUser = createSelector(
  (state: RootState) => state.user,
  (user) => user
);

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;
