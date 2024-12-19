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
import PurchaseItemApi from "./PurchaseItemSlice.tsx";
const local = https + "/purchases";
const keyMapping = {
  id: "Id",
  colorname: "Color",
  colorhex: "HexColor",
  createAt: "CreateAt",
};
interface ColorState {
  Purchase: [] | null;
  loading: boolean;
  error: string | null;
}
const initialState: ColorState = {
  Purchase: localStorage.getItem("purchase")
    ? JSON.parse(localStorage.getItem("purchase")!)
    : [],
  loading: false,
  error: null,
};
const PurchaseApi = createSlice({
  name: "purchase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostPurchase.fulfilled, (state, action) => {
        const result = action.payload;
        if (result.success) {
          state.Purchase.push(result.result);
          toasityComponent(`Add Purchase Success`, StatusEnum.SUCCESS);
        } else {
          toasityComponent(
            `Cause:  ${result.message}`,
            StatusEnum.ERROR
          );
        }
      })
        .addCase(PutPurchase.fulfilled,(state,action)=>{
            const result = action.payload;
            if (result.success) {
              const purchase = state.Purchase.map((purchaseItem) =>
                purchaseItem.id === result.result.id? result.result : purchaseItem
              );
              state.Purchase = purchase;
              toasityComponent(`Update Purchase Success`, StatusEnum.SUCCESS);
            } else {
              toasityComponent(
                `Cause:  ${result.message}`,
                StatusEnum.ERROR
              );
            }

        })
        .addCase(PutPurchaseInventory.fulfilled,(state,action)=>{
            const result = action.payload;
            if (result.success) {
                const purchase = state.Purchase.map((purchaseItem) =>
                    purchaseItem.id === result.result.id? result.result : purchaseItem
                );
                state.Purchase = purchase;
                toasityComponent(`Import Purchase Success`, StatusEnum.SUCCESS);
            } else {
                toasityComponent(
                    `Cause:  ${result.message}`,
                    StatusEnum.ERROR
                );
            }

        })
      .addCase(Getpurchase.fulfilled, (state, action) => {
        const result = action.payload;
        state.Purchase = result.result;

      });
  },
});
export const Getpurchase = createAsyncThunk(
  "purchase/Getpurchase",
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
export const PostPurchase = createAsyncThunk(
  "purchase/PostPurchase",
  async ({token}, { rejectWithValue }) => {
    
    try {
      const response = await fetch(`${local}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({totalamoung:0}),
      });

      if (!response.ok) {
        toasityComponent("Fail to created Purchase", StatusEnum.ERROR);
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
export const PutPurchase = createAsyncThunk(
    "purchase/PutPurchase",
    async ({totalamoung,id,token}, { rejectWithValue }) => {

        try {
            const response = await fetch(`${local}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PUT",
                body: JSON.stringify({totalamoung:totalamoung}),
            });

            if (!response.ok) {
                toasityComponent("Fail to update Purchase", StatusEnum.ERROR);
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
export const PostPurchaseItemList = createAsyncThunk(
    "purchase/PostPurchaseItemList",
    async ({list,token}, { rejectWithValue }) => {

      try {
        const response = await fetch(`${local}/purchase_items`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify(list),
        });

        if (!response.ok) {
          toasityComponent("Fail to created Purchase Items", StatusEnum.ERROR);
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
export const PutPurchaseInventory = createAsyncThunk(
    "purchase/PutPurchaseInventory",
    async ({id,list,token}, { rejectWithValue }) => {

        try {
            const response = await fetch(`${local}/changestate/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PUT",
                body: JSON.stringify(list),
            });

            if (!response.ok) {
                toasityComponent("Fail to Update Purchase And Import", StatusEnum.ERROR);
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
export const CreatePurchaseItem = (data:any) => {
  return async function check(dispatch, getState) {
      const Sizedata=getState().size.Size;
      const token = JSON.parse(getState().authentication.token);
      if (!getState().purchaseitem.PurchaseCreated || Object.keys(getState().purchaseitem.PurchaseCreated).length === 0)
          {
         const purchase= await dispatch(PostPurchase({token}));
        dispatch(PurchaseItemApi.actions.ChangePurchaseCreate(purchase.payload.result));
      }
      const purchase=getState().purchaseitem.PurchaseCreated
    const listItemConvert = data.size.flatMap((el=>data.color.map((el1)=>
        ({
          quantity:data.quantity,
          idpurchase:purchase.id,
          color:el1,
          size:Sizedata?.find((size)=>size.Size==el).SizeName||"",
          productname:data.title,
        }))))
      const purchaseupdate=await dispatch(PostPurchaseItemList({list:listItemConvert, token:token}))
      dispatch(PurchaseItemApi.actions.ChangePurchaseCreate(purchaseupdate.payload.result));
  };
};
export const UpdatePurchase = () => {
    return async function check(dispatch, getState) {
        const purchase=getState().purchaseitem.PurchaseCreated;
        const token = JSON.parse(getState().authentication.token);
        const totalamount = (purchase?.items || []).reduce(
            (acc, item) => acc + (Number(item.quantity || 0) * Number(item.totalprice || 0)),
            0
        );
        await dispatch(PutPurchase({id:purchase.id,totalamoung:totalamount, token:token}))
        dispatch(PurchaseItemApi.actions.ChangePurchaseCreate({}))
    };
};
export const ImportPurchase = (id) => {
    return async function check(dispatch, getState) {
        const purchase=getState().purchase.Purchase?.find((el)=>el.id==id);
        const token = JSON.parse(getState().authentication.token);
        const list=purchase?.items?.map((el)=>({
            change_amount:el.quantity,
            versionid:el.version.idversion
        }))
        await dispatch(PutPurchaseInventory({id:id,list:list,token:token}));
    };
};
export default PurchaseApi;
