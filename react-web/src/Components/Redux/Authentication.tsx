import { Password } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { https } from "./Https";
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
    .addCase(Getmyinfor.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  }
});
export const Getmyinfor=createAsyncThunk(
    "authentication/Getmyinfor",
    async (payload, action) => {
    const res = await fetch(`${local}/myinfor`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload}`,
      },
      method: "GET",
    });
    const data = await res.json();
      return data;
})
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
export default Authentication;
