import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import { Snackbar } from "@mui/material";
import MapKeys from "../MapKey/Mapkey";
import SnackBarComponent, {
  toasityComponent,
} from "../SnackBar/SnackBarComponent";
import { toast } from "react-toastify";
import { StatusEnum } from "../../types/Status";
import { Color } from "./Selector";
import {PutInventory} from "./InventorySlice.tsx";
const local = https + "/orders";
const keyMapping = {
  id: "Id",
  colorname: "Color",
  colorhex: "HexColor",
  createAt: "CreateAt",
};
interface OrderState {
  Order: [] | null;
  loading: boolean;
  error: string | null;
}
const initialState: OrderState = {
  Order: localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("order")!)
    : [],
  loading: false,
  error: null,
};
const OrderApi = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetOrder.fulfilled, (state, action) => {
        const result = action.payload;
        state.Order = result.result.filter((el=>el.status!="PENDING"));
      })
        .addCase(PutOrderItem.fulfilled, (state, action) => {
            const result = action.payload;
            if (result.success) {
              state.Order = state.Order?.map((order) =>
                order.idorder == result.result.idorder
                 ? result.result
                  : order
              );
              toasityComponent(`Update Order Success`, StatusEnum.SUCCESS);
            } else {
              toasityComponent(
                `Cause:  ${result.message}`,
                StatusEnum.ERROR
              );
            }
        })
  },
});
export const GetOrder = createAsyncThunk(
  "color/GetOrder",
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
export const PutOrderItem = createAsyncThunk(
    "order/PutOrderItem",
    async ({token,id}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${local}/shipping/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PUT",
            });

            if (!response.ok) {
                throw new Error('Failed to change orderItem');
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
export const ChangeStatus = (id) => {
  return async function check(dispatch, getState) {
    try {
      const token=JSON.parse(getState().authentication.token) ;
      getState().order.Order?.find((el)=>el.idorder==id)?.orderitems.map(async (el)=>{
          await dispatch(PutInventory({data1:{
                  change_amount:el.quantity,
                  orderitem:el.idorderitem,
                  productname:el.productname,
                  colorname:el.colorname,
                  sizename:el.sizename,
              },token:token}))
      })
        await dispatch(PutOrderItem({id:id,token:token}));
    }catch (e) {
      toasityComponent(`Có lỗi xảy ra:  ${Error.message}`,StatusEnum.ERROR)
    }

  };
};
export default OrderApi;
