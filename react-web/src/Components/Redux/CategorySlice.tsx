import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import { StatusEnum } from "../../types/Status";
import { toasityComponent } from "../SnackBar/SnackBarComponent";
import MapKeys from "../MapKey/Mapkey";

const local = https + "/category";
const keyMapping = {
  id: "Id",
  name: "NameCategory",
  createat: "CreateAt",
  updateat: "UpdateAt",
  isdeleted:"Status"
};
interface CategoryState {
    Category: [] | null;
  loading: boolean;
  error: string | null;
}
const initialState: CategoryState = {
  Category: localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("Category")!)
    : [],
  loading: false,
  error: null,
};
const CategoryApi = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostCategory.fulfilled, (state, action) => {
        const result = action.payload;
        if (result.success) {
          state.Category.push(MapKeys(result.result, keyMapping));
          toasityComponent(`Add Category Success`, StatusEnum.SUCCESS);
        } else {
          toasityComponent(
            `Cause:  ${result.message}`,
            StatusEnum.ERROR
          );
        }
      })
      .addCase(GetCategory.fulfilled, (state, action) => {
        const result = action.payload;
        state.Category = Array.from(result.result).map((item) =>
          MapKeys(item, keyMapping)
        );
      });
  },
});
export const GetCategory = createAsyncThunk(
  "category/GetCategory",
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
export const PostCategory = createAsyncThunk(
  "category/PostCategory",
  async ({category,token}, { rejectWithValue }) => {
    
    try {
      const response = await fetch(`${local}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        toasityComponent("Fail to created Category", StatusEnum.ERROR);
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
export const CreateCategory = (data) => {
  return async function check(dispatch, getState) {
    const token =JSON.parse(localStorage.getItem("token"));
    const currentState = getState(); // Lấy toàn bộ state
    const existingCategory = currentState.category.Category;
    existingCategory.map((el) => {
      if (el.NameCategory == data.name) {
        toasityComponent(" CateGory Has exsist",StatusEnum.INFO);
        return;
      }
    });
    await dispatch(PostCategory({category:data,token}));
  };
};
export default CategoryApi;
