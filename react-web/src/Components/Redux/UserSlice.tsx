import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import { GetToken } from "./Authentication";
// Constants
const local = https + "/user";

// Types
interface UserState {
  Infor: any;
  user:{}; // Replace 'any' with proper type
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  Infor: "",
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
  user:{},
  loading: false,
  error: null
};

// Async Thunks
export const Getmyinfor = createAsyncThunk(
  "user/Getmyinfor",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${local}/myinfor`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Slice
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.Infor = "";
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // GetToken cases
      .addCase(GetToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(GetToken.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.token = action.payload.result.token;
          localStorage.setItem('token', JSON.stringify(state.token));
        }
      })
      .addCase(Getmyinfor.fulfilled, (state, action) => {
        const result=action.payload;
        state.user=result.result;
        
    });;
  },
});

// Thunk action creator
export const SignUp = (data: any) => { // Replace 'any' with proper type
  return async function (dispatch: any, getState: any) {
    try {
      await dispatch(GetToken(data));
      const token = getState().authentication.token;
      if (!token) {
        throw new Error('Authentication failed');
      }
      await dispatch(Getmyinfor(token));
    } catch (error) {
      console.error('SignUp process failed:', error);
      // You might want to dispatch an error action here
    }
  };
};


// Export actions and reducer
export const { clearUserData } = UserSlice;
export default UserSlice;