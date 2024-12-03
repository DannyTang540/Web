import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import { StatusEnum } from "../../types/Status";
import { toasityComponent } from "../SnackBar/SnackBarComponent";
import MapKeys from "../MapKey/Mapkey";

const local = https + "/sizes";
const keyMapping = {
  id: "Id",
  size: "Size",
  sizename: "SizeName",
  createat: "CreateAt",
  updateat: "UpdateAt",
};
interface SizeState {
  Size: [] | null;
  loading: boolean;
  error: string | null;
}
const initialState: SizeState = {
  Size: localStorage.getItem("size")
    ? JSON.parse(localStorage.getItem("size")!)
    : [],
  loading: false,
  error: null,
};
const SizeApi = createSlice({
  name: "size",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(PostSize.fulfilled, (state, action) => {
          const result = action.payload;
          if (result.success) {
            state.Size.push(MapKeys(result.result, keyMapping));
            toasityComponent(`Add Size Success`, StatusEnum.SUCCESS);
          } else {
            toasityComponent(
              `Cause:  ${result.message}`,
              StatusEnum.ERROR
            );
          }
        })
      .addCase(GetSize.fulfilled, (state, action) => {
        const result = action.payload;
        state.Size = Array.from(result.result).map((item) =>
          MapKeys(item, keyMapping)
        );
      });
  },
});
export const GetSize = createAsyncThunk("size/GetSize", async () => {
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
});
export const PostSize = createAsyncThunk(
  "size/PostSize",
  async ({size,token}, { rejectWithValue }) => {

    try {
      const response = await fetch(`${local}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(size),
      });

      if (!response.ok) {
        toasityComponent("Fail to created Size", StatusEnum.ERROR);
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
export const CreateSize = (data) => {
  return async function check(dispatch, getState) {
    const token = JSON.parse(localStorage.getItem("token"));
    const currentState = getState(); // Lấy toàn bộ state
    const existingSize = currentState.size.Size;
    existingSize.map((el) => {
      if (el.Size == data.size) {
        toasityComponent(" Size Has exsist", StatusEnum.INFO);
        return;
      } else if (el.SizeName == data.sizename) {
        toasityComponent(" Size Name Has exsist", StatusEnum.INFO);
        return;
      }
    });
    await dispatch(PostSize({ size: data, token }));
  };
};
export default SizeApi;
