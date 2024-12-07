import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {https} from "./Https";
import {toasityComponent} from "../SnackBar/SnackBarComponent.tsx";
import {StatusEnum} from "../../types/Status.ts";

const local = https + "/products";
interface ProductState {
    Product: [] | null;
    loading: boolean;
    error: string | null;
}
const initialState: ProductState = {
    Product: localStorage.getItem("product")
        ? JSON.parse(localStorage.getItem("product")!)
        : [],
    loading: false,
    error: null,
};
const ProductApi = createSlice({
  name: "product",
    initialState,
  reducers: {
    /*ChangeIntrospect: (state) => {
      state.Introspect=true;
      localStorage.setItem('token', JSON.stringify(true));
    },*/
  },
  extraReducers: (builder) => {
    builder
        .addCase(GetProduct.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Product=result.result;
                localStorage.setItem('product', JSON.stringify(result.result));
            }
        })
        .addCase(DescriptionsProduct.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Product.push(result.result);
                localStorage.setItem('product', JSON.stringify(state.Product));
            }else {
                toasityComponent(
                    `Cause:  ${result.message}`,
                    StatusEnum.ERROR
                );
            }
        })


  }
});

export const GetProduct = createAsyncThunk(
  "product/GetProduct",
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
export const PostProduct = createAsyncThunk(
    "product/PostProduct",
    async ({product, token}, {rejectWithValue}) => {

        try {
            const response = await fetch(`${local}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                toasityComponent("Fail to created product", StatusEnum.ERROR);
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
export const ImageProduct = createAsyncThunk(
    "product/ImageProduct",
    async ({data, token}, {rejectWithValue}) => {

        try {
            const response = await fetch(`${local}/image`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PUT",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                toasityComponent("Fail to created product", StatusEnum.ERROR);
            }
            const data1 = await response.json();
            return data1;
        } catch (error) {
            toasityComponent(`${(error as Error).message}`,
                StatusEnum.ERROR
            );
            return rejectWithValue((error as Error).message);
        }
    }
);
export const VarientsProduct = createAsyncThunk(
    "product/VarientsProduct",
    async ({data, token}, {rejectWithValue}) => {
        try {
            const response = await fetch(`${local}/variants`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                toasityComponent("Fail to created product varient", StatusEnum.ERROR);
            }
            const data1 = await response.json();
            return data1;
        } catch (error) {
            toasityComponent(`${(error as Error).message}`,
                StatusEnum.ERROR
            );
            return rejectWithValue((error as Error).message);
        }
    }
);
export const DescriptionsProduct = createAsyncThunk(
    "product/DescriptionsProduct",
    async ({data, token}, {rejectWithValue}) => {
        try {
            const response = await fetch(`${local}/descriptions`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                toasityComponent("Fail to created product descriptions", StatusEnum.ERROR);
            }
            const data1 = await response.json();
            return data1;
        } catch (error) {
            toasityComponent(`${(error as Error).message}`,
                StatusEnum.ERROR
            );
            return rejectWithValue((error as Error).message);
        }
    }
);
export const UploadImage = createAsyncThunk(
    "product/UploadImage",
    async ({data, token}, {rejectWithValue}) => {
        try {
            const response = await fetch(`http://localhost:8080/images/upload`, {
                headers: {
                Authorization: `Bearer ${token}`, // Chỉ giữ Authorization, không cần Content-Type
                },
                method: "POST",
                redirect:"follow",
                body: data, // data là FormData
            });

            if (!response.ok) {
                toasityComponent("Fail to created Image Product", StatusEnum.ERROR);
                return rejectWithValue('Failed to upload image');
            }

            const data1 = await response.json();  // Dùng .json() thay vì .text() nếu trả về JSON
            return data1;
        } catch (error) {
            toasityComponent(`${(error as Error).message}`, StatusEnum.ERROR);
            return rejectWithValue((error as Error).message);
        }
    }
);


export const CreateProduct = (payload) => {
    return async function check(dispatch, getState) {
        try {
            const token = JSON.parse(getState().authentication.token);
            // @ts-ignore
            const product = await dispatch(PostProduct({
                product: {
                    name: payload.productname,
                    materialName: payload.material,
                    categoryname: payload.category,
                gender: payload.gender
        },
            token: token,
        }))
            ;
            console.log(product.payload.result)
            const formData = new FormData();
            if (payload.Image != null) {
                formData.append("file", payload.Image,payload.Image.name);
                // @ts-ignore
                const url=await dispatch(UploadImage({data:formData,token:token}));
                // @ts-ignore
                await dispatch(ImageProduct({data:{
                        idproduct:product.payload.result.id,
                        idImage:url.payload.result.idimage,
                    },token:token}))
            }
            if (payload.colors.length !== 0 && payload.sizes.length !== 0) {
                const list = payload.colors.flatMap((color) =>
                    payload.sizes.map((size) => ({
                        colorname: color,
                        sizename: size,
                        categoryname: payload.category,
                        originalprice: payload.price,
                        selling_price: payload.sellingprice,
                        idproduct: product.payload.result.id,
                    }))
                );
                await dispatch(VarientsProduct({data:list,token:token}));
            }
            const description=payload.description.map((el)=>({...el,idproduct:product.payload.result.id}));
            await dispatch(DescriptionsProduct({data:description,token:token}));

        } catch (error) {
            toasityComponent(`${(error as Error).message}`,
                StatusEnum.ERROR
            );
        }
    };
};
export default ProductApi;
