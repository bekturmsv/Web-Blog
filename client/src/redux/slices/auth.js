import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axiosBaseUrl from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
    const {data} = await axiosBaseUrl.post("/auth/login", params);
    return data;
})

const initialState = {
    data: null,
    status: "loading"
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers:{
        [fetchAuth.pending]: (state)=> {
            state.status = "loading"
            state.data = null
        },
        [fetchAuth.fulfilled]: (state,action)=> {
            state.status = "laoded"
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state)=> {
            state.status = "error"
            state.data = null
        },
    }
})

export const authReducer = authSlice.reducer
export const selectIsAuth = state => Boolean(state.auth.data)