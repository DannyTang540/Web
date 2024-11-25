import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import { Snackbar } from "@mui/material";
import MapKeys from "../MapKey/Mapkey";
import SnackBarComponent, {
  toasityComponent,
} from "../SnackBar/SnackBarComponent";
import { toast } from "react-toastify";
import { StatusEnum } from "../../types/Status";
const local = https + "/material";
const keyMapping = {
  id: "Id",
  name: "NameMaterial",
  createat: "CreateAt",
  updateat: "UpdateAt",
  isdeleted:"Status"
};
interface MaterialState {
  Material: [] | null;
  loading: boolean;
  error: string | null;
}
const initialState: MaterialState = {
  Material: localStorage.getItem("material")
    ? JSON.parse(localStorage.getItem("material")!)
    : [],
  loading: false,
  error: null,
};
const MaterialApi = createSlice({
  name: "material",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostMaterial.fulfilled, (state, action) => {
        const result = action.payload;
        if (result.success) {
          state.Material.push(MapKeys(result.result, keyMapping));
          toasityComponent(`Add Material Success`, StatusEnum.SUCCESS);
        } else {
          toasityComponent(
            `Cause:  ${result.message}`,
            StatusEnum.ERROR
          );
        }
      })
      .addCase(GetMaterial.fulfilled, (state, action) => {
        const result = action.payload;
        state.Material = Array.from(result.result).map((item) =>
          MapKeys(item, keyMapping)
        );
      });
  },
});
export const GetMaterial = createAsyncThunk(
  "material/GetMaterial",
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
export const PostMaterial = createAsyncThunk(
  "material/PostMaterial",
  async ({material,token}, { rejectWithValue }) => {
    
    try {
      const response = await fetch(`${local}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(material),
      });

      if (!response.ok) {
        toasityComponent("Fail to created material", StatusEnum.ERROR);
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
export const CreateMaterial = (data) => {
  return async function check(dispatch, getState) {
    const token =JSON.parse(localStorage.getItem("token"));
    const currentState = getState(); // Lấy toàn bộ state
    const existingMaterials = currentState.material.Material;
    existingMaterials.map((el) => {
      if (el.NameMaterial == data.name) {
        toasityComponent("Material Has exsist",StatusEnum.INFO);
        return;
      }
    });
    await dispatch(PostMaterial({material:data,token}));
  };
};
export default MaterialApi;
