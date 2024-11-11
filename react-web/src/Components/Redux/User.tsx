import { Password } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { https } from "./Https";
import { GetToken } from "./Authentication";
const local = https + "/user";

const User = createSlice({
  name: "authentication",
  initialState: {
    Infor:"",
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

export const SignUp = (data) => {
  return async function check(dispatch, getState) {
    await dispatch(GetToken(data));
    const token = getState().authentication.token;
    console.log(token);

    await dispatch(Getmyinfor(token));
  };
};
export default User;
