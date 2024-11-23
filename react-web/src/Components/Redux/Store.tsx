import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import Authentication from './Authentication'
import ColorApi from './ColorSlice'
const store = configureStore({
    reducer: {
        // Define your reducer functions here
        authentication:Authentication.reducer,
        color:ColorApi.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        
    //     serializableCheck: false,
    // }),
    // devTools: process.env.NODE_ENV!== 'production',
})


export default store
