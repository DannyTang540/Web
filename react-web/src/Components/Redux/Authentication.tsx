import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import { GetColor } from "./ColorSlice";
import { GetCategory } from "./CategorySlice";
import { GetSize } from "./SizeSlice";
const local = https + "/authentication";

const Authentication = createSlice({
  name: "authentication",
  initialState: {
    Username: "",
    Password: "",
    token:localStorage.getItem("token") ? localStorage.getItem("token") : "",
  },
  reducers: {},
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
//Component này dùng để lấy thông tin thuộc tính sản phẩm
export const FetchInfom = () => {
  return async function check(dispatch, getState) {
          await dispatch(GetColor());
          await dispatch(GetCategory());
          await dispatch(GetSize());
  };
};
export default Authentication;
