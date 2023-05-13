import { createReducer } from "@reduxjs/toolkit";

// Create Action 
import JsonData from "../JsonData.js"
export const StoreDataAction = () => {

    return (dispatch) => {
        const data = JsonData()
        dispatch({ type: "StoreData", payload: data })
    }


}

//  Create Reducer 
const intitialState = {};
export const userReducer = createReducer(intitialState, {
    StoreData: (state, action) => {
        state.User = action.payload

    }
})
