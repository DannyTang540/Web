import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import { GetColor } from "./ColorSlice";
import { GetCategory } from "./CategorySlice";
import { GetSize } from "./SizeSlice";
import { toasityComponent } from "../SnackBar/SnackBarComponent";
import { StatusEnum } from "../../types/Status";
import { GetMaterial } from "./MaterialSlice";
import {GetProduct} from "./Product.tsx";
import {GetOrder} from "./OrderSlice.tsx";
import {Getpurchase} from "./PurchaseSlice.tsx";
import PurchaseItemApi from "./PurchaseItemSlice.tsx";
import {GetUser} from "./UserSlice.tsx";
const local = https + "/authentication";

const Authentication = createSlice({
  name: "authentication",
  initialState: {
    Username: "",
    Password: "",
    Introspect:localStorage.getItem("Introspect") ?localStorage.getItem("Introspect"):false,
    token:localStorage.getItem("token") ? localStorage.getItem("token") : "",
  },
  reducers: {
    ChangeIntrospect: (state) => {
      state.Introspect=true;
      localStorage.setItem('token', JSON.stringify(true));
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(GetToken.fulfilled, (state, action) => {
        const result=action.payload
      if(result.success)
      {
        state.token = result.result.token;
        
        localStorage.setItem('token', JSON.stringify(state.token));
      }
    })
    .addCase(Introspect.fulfilled, (state, action) => {
      const result=action.payload.result
      state.Introspect=result.valid;
      localStorage.setItem('Introspect', JSON.stringify(state.Introspect));
    })
    .addCase(RefreshToken.fulfilled, (state, action) => {
      const result=action.payload.result
      if(action.payload.success){
        state.token = result.token;
        state.Introspect=result.authenticated;
        localStorage.setItem('Introspect', JSON.stringify(result.authenticated));
        localStorage.setItem('token', JSON.stringify(state.token));
      }
      else{
        toasityComponent(
          `Cause:  ${action.payload.message}`,
          StatusEnum.ERROR
        );
      }
    })
  }
});

export const GetToken = createAsyncThunk(
  "authentication/GetToken",
  async (payload, { rejectWithValue }) => {
      const res = await fetch(`${local}/token`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      });

      const data = await res.json();
      return data; // Thay `data` với token hoặc các thông tin cần thiết từ phản hồi
  }
);
export const Introspect = createAsyncThunk(
  "authentication/Introspect",
  async (payload, { rejectWithValue }) => {
      const res = await fetch(`${local}/introspect`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('token')),
        }),
      });

      const data = await res.json();
      return data; // Thay `data` với token hoặc các thông tin cần thiết từ phản hồi
  }
);
export const RefreshToken = createAsyncThunk(
  "authentication/RefreshToken",
  async (payload, { rejectWithValue }) => {
      const res = await fetch(`${local}/refresh`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem('token')),
        }),
      });

      const data = await res.json();
      return data; // Thay `data` với token hoặc các thông tin cần thiết từ phản hồi
  }
);
export const IntrospectAndRefresh = () => {
  return async function check(dispatch, getState) {
      if(localStorage.getItem('token'))
      {
        await dispatch(Introspect());
        const updateState = getState();
        if(!updateState.authentication.Introspect)
        {
          await dispatch(RefreshToken());
        }
      }
  };
};
//Component này dùng để lấy thông tin thuộc tính sản phẩm
export const FetchInfom = () => {
  return async function check(dispatch, getState) {
          await dispatch(GetColor());
          await dispatch(GetCategory());
          await dispatch(GetSize());
          await dispatch(GetMaterial());
          await dispatch(GetProduct());
          await dispatch(GetOrder());
          await dispatch(Getpurchase());
          await dispatch(GetUser());
          const purchase=getState().purchase.Purchase;
          dispatch(PurchaseItemApi.actions.ChangePurchaseCreate(purchase?.find((el=>el.status=="Created"))));
  };
};
export default Authentication;
