
import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './Action-Reducer.js'

// configureStore Store 

const store = configureStore({
    reducer: {
        UserData: userReducer
    }
})

export default store;