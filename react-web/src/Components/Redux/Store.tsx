import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import Authentication from './Authentication'
import ColorApi from './ColorSlice'
import UserSlice from './UserSlice'
import CategoryApi from './CategorySlice'
import SizeApi from './SizeSlice'
import MaterialApi from './MaterialSlice'
import ProductApi from "./Product.tsx";
const store = configureStore({
    reducer: {
        // Define your reducer functions here
        authentication:Authentication.reducer,
        color:ColorApi.reducer,
        user:UserSlice.reducer,
        category:CategoryApi.reducer,
        size:SizeApi.reducer,
        material:MaterialApi.reducer,
        product:ProductApi.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        
    //     serializableCheck: false,
    // }),
    // devTools: process.env.NODE_ENV!== 'production',
})


export default store
