import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import {toasityComponent} from "../SnackBar/SnackBarComponent.tsx";
import {StatusEnum} from "../../types/Status.ts";
const local = https + "/inventory";
const initialState = {
    Color: [],
    loading: false,
    error: null,
};
const InventoryAPi = createSlice({
  name: "inventory",
    initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder



  }
});

export const PutInventory = createAsyncThunk(
  "inventory/PutInventory",
    async ({data1,token}) => {
        try {
            const res = await fetch(`${local}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method:"POST",
                body: JSON.stringify(data1),
            });
            const data = await res.json();
            return data;
        } catch (error) {
            toasityComponent(
                `Có lỗi xảy ra:  ${Error.message}`,
                StatusEnum.ERROR,
            );
        }
    }
);
export default InventoryAPi;
