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
const local = https + "/purchase_items";
const keyMapping = {
  id: "Id",
  colorname: "Color",
  colorhex: "HexColor",
  createAt: "CreateAt",
};
interface PurchaseItemState {
  PurchaseCreated: {} | null;
  loading: boolean;
  error: string | null;
}
const initialState: PurchaseItemState = {
  PurchaseCreated: localStorage.getItem("purchaseitem")
    ? JSON.parse(localStorage.getItem("purchaseitem")!)
    : [],
  loading: false,
  error: null,
};
const PurchaseItemApi = createSlice({
  name: "purchaseitem",
  initialState,
  reducers: {
    ChangePurchaseCreate: (state,action) => {
      state.PurchaseCreated=action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeletePurchaseItem.fulfilled, (state, action) => {
        const result = action.payload;
        if (result.success) {
          state.PurchaseCreated={...state.PurchaseCreated,items:state?.PurchaseCreated?.items?.filter((el)=>el.idpurchaseitem!=result.result)}
          toasityComponent(`Delete Purchase Item Success`, StatusEnum.SUCCESS);
        } else {
          toasityComponent(
            `Cause:  ${result.message}`,
            StatusEnum.ERROR
          );
        }
      })
      /*.addCase(Getpurchase.fulfilled, (state, action) => {
        const result = action.payload;
        state.Purchase = result.result;

      });*/
  },
});
export const DeletePurchaseItem = createAsyncThunk(
    "purchaseitem/DeletePurchaseItem",
    async ({id,token}, { rejectWithValue }) => {

      try {
        const response = await fetch(`${local}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        });

        if (!response.ok) {
          toasityComponent("Fail to delete Purchase_item", StatusEnum.ERROR);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        toasityComponent(`${(error as Error).message}`,
            StatusEnum.ERROR
        );
        return rejectWithValue((error as Error).message);
      }
    }
);
export const PostPurchaseItem = createAsyncThunk(
  "purchaseitem/PostPurchaseItem",
  async ({data1,token}, { rejectWithValue }) => {
    
    try {
      const response = await fetch(`${local}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(data1),
      });

      if (!response.ok) {
        toasityComponent("Fail to created Purchase_item", StatusEnum.ERROR);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      toasityComponent(`${(error as Error).message}`,
        StatusEnum.ERROR
      );
      return rejectWithValue((error as Error).message);
    }
  }
);
export const DeleteItem = (data) => {
  console.log(typeof data)
  return async function check(dispatch, getState) {
    const token=JSON.parse(getState().authentication.token);
    await dispatch(DeletePurchaseItem({id:data, token:token}))
  };
};
export default PurchaseItemApi;
