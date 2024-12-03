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
const local = https + "/colors";
const keyMapping = {
  id: "Id",
  colorname: "Color",
  colorhex: "HexColor",
  createAt: "CreateAt",
};
interface ColorState {
  Color: [] | null;
  loading: boolean;
  error: string | null;
}
const initialState: ColorState = {
  Color: localStorage.getItem("color")
    ? JSON.parse(localStorage.getItem("color")!)
    : [],
  loading: false,
  error: null,
};
const ColorApi = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostColor.fulfilled, (state, action) => {
        const result = action.payload;
        if (result.success) {
          state.Color.push(MapKeys(result.result, keyMapping));
          toasityComponent(`Add Color Success`, StatusEnum.SUCCESS);
        } else {
          toasityComponent(
            `Cause:  ${result.message}`,
            StatusEnum.ERROR
          );
        }
      })
      .addCase(GetColor.fulfilled, (state, action) => {
        const result = action.payload;
        state.Color = Array.from(result.result).map((item) =>
          MapKeys(item, keyMapping)
        );
      });
  },
});
export const GetColor = createAsyncThunk(
  "color/GetColor",
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
export const PostColor = createAsyncThunk(
  "color/PostColor",
  async ({color,token}, { rejectWithValue }) => {
    
    try {
      const response = await fetch(`${local}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(color),
      });

      if (!response.ok) {
        toasityComponent("Fail to created Color", StatusEnum.ERROR);
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
export const CreateColor = (data) => {
  return async function check(dispatch, getState) {
    const token =JSON.parse(localStorage.getItem("token"));
    const currentState = getState(); // Lấy toàn bộ state
    const existingColors = currentState.color.Color;
    existingColors.map((el) => {
      if (el.Color == data.colorname) {
        toasityComponent("Color Has exsist",StatusEnum.INFO);
        return;
      } else if (el.HexColor == data.colorhex) {
        toasityComponent("Hex Color Has exsist",StatusEnum.INFO);
        return;
      }
    });
    await dispatch(PostColor({color:data,token}));
  };
};
export default ColorApi;
