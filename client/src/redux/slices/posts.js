import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axiosBaseUrl from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const {data} = await axiosBaseUrl.get("/posts");
    return data;
})

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
    const {data} = await axiosBaseUrl.get("/tags");
    return data;
})

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => { await axiosBaseUrl.delete(`/posts/${id}`);})

const initialState = {
    posts: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    }
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        // Get Posts
        [fetchPosts.pending]: (state)=> {
            state.posts.items = []
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state,action)=> {
            state.posts.items = action.payload
            state.posts.status = "loaded"
        },
        [fetchPosts.rejected]: (state)=> {
            state.posts.items = []
            state.posts.status = "error"
        },
        // Get Tags
        [fetchTags.pending]: (state)=> {
            state.tags.items = []
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state,action)=> {
            state.tags.items = action.payload
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]: (state)=> {
            state.tags.items = []
            state.tags.status = "error"
        },
         // Delete Post
         [fetchRemovePost.pending]: (state, action)=> {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const postsReducer = postSlice.reducer;