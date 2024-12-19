import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import Authentication, { GetToken } from "./Authentication";
import {toasityComponent} from "../SnackBar/SnackBarComponent.tsx";
import {StatusEnum} from "../../types/Status.ts";
// Constants
const local = https + "/users";

// Types
interface UserState {
  Infor: any;
  user:{};
  users:[];
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  Infor: "",
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
  user:{},
  users:[],
  loading: false,
  error: null
};
export const GetUser = createAsyncThunk(
    "user/GetUser",
    async () => {
      try {
        const res = await fetch(`${local}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        toasityComponent(
            `Có lỗi xảy ra:  ${(error as Error).message}`,
            StatusEnum.ERROR
        );
      }
    }
);
export const PostUserAmin = createAsyncThunk(
    "order/PostUserAmin",
    async ({token,data1}, { rejectWithValue }) => {
      try {
        const response = await fetch(`${local}/admin`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body:JSON.stringify(data1)
        });

        if (!response.ok) {
          throw new Error('Failed to create user role admin');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        toasityComponent(
            `Có lỗi xảy ra:  ${error.mesage}`,
            StatusEnum.ERROR,
        );
      }
    }
);
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
        .addCase(GetUser.fulfilled,(state,action) => {
          const result=action.payload;
          if(result.success)
          {
              state.users=result.result;
          }
          else{
            toasityComponent("cause: "+result.message,StatusEnum.ERROR)
          }
        })
        .addCase(PostUserAmin.fulfilled,(state,action) => {
          const result=action.payload;
          if(result.success)
          {
              state.users=[...state.users,result.result];
          }
          else{
            toasityComponent("cause: "+result.message,StatusEnum.ERROR)
          }
        })
      .addCase(GetToken.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.token = action.payload.result.token;
          localStorage.setItem('token', JSON.stringify(state.token));
        }
        else{
          toasityComponent("cause: "+result.message,StatusEnum.ERROR)
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
      dispatch(Authentication.actions.ChangeIntrospect);
    } catch (error) {
      console.error('SignUp process failed:', error);
      // You might want to dispatch an error action here
    }
  };
};
export const CreateUserAmin = (data: any) => { // Replace 'any' with proper type
  return async function (dispatch: any, getState: any) {
    try {
      console.log(data)
      const token = JSON.parse(getState().authentication.token);

      await dispatch(PostUserAmin({data1:data,token:token}));
    } catch (error) {
      console.error('SignUp process failed:', error);
      // You might want to dispatch an error action here
    }
  };
};

// Export actions and reducer
export const { clearUserData } = UserSlice;
export default UserSlice;