import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { save, remove } from '../../utils/storage';
import { auth } from 'src/utils/type';
import { config, baseURL } from 'src/utils/apiConfig';

interface AuthState {
  islogin: boolean;
  email: string | null;
  user: string | null;
  error: string | null;
  isloading: boolean;
}

const initialState: AuthState = {
  islogin: false,
  email: null,
  user: null,
  error: null,
  isloading: false,
};

export const userLogin = createAsyncThunk<
  auth,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (authCredentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `http://10.2.140.140:3000/login`,
      authCredentials,
    );
    return response.data; 
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.islogin = false;
      state.email = null;
      state.user = null;
      state.error = null;
      remove('auth');
    },
    login: (state, action: PayloadAction<auth>) => {
      state.islogin = true;
      state.email = action.payload.email;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isloading = true;
        state.error = null; 
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<auth>) => {
        state.islogin = true;
        state.email = action.payload.email;
        state.user = action.payload.user;
        state.isloading = false;
        save('auth', action.payload); 
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload || 'Login failed'; 
      });
  },
});

export const { logout ,login} = authSlice.actions;
export default authSlice.reducer;
