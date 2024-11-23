import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import { Snackbar } from "@mui/material";
const local = https + "/color";
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
    builder.addCase(GetColor.fulfilled, (state, action) => {
      const result = action.payload;
      if (result.success) {
        console.log(typeof result.result);
        state.Color = Array.from(result.result);
      } else {
        <Snackbar
          open={true}
          TransitionComponent="Fade"
          message={result.message}
          key={"Error Message"}
          autoHideDuration={1200}
        />;
      }
      console.log(action.payload);
    });
  },
});
export const GetColor = createAsyncThunk("color/GetColor", async () => {
  const res = await fetch(`${local}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});
// export const GetColor = createAsyncThunk(
//   "color/GetColor",
//   async ( { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${local}`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch user information');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );
export default ColorApi;
