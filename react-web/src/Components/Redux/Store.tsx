import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import Authentication from './Authentication'

const store = configureStore({
    reducer: {
        // Define your reducer functions here
        authentication:Authentication.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        
    //     serializableCheck: false,
    // }),
    // devTools: process.env.NODE_ENV!== 'production',
})


export default store
