import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";


const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || " ",
    data : localStorage.getItem('data') || {}
}


export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    const res = axiosInstance.post('user/register', data);
    await toast.promise(res, {
        loading : 'Creating your account',
        success : (data) => {
            return data?.data?.message;
        },
        error : (err) => err?.response?.data?.message || 'Failed to Create Account, Please Try again..'
    })
    return (await res).data;
})


export const Login = createAsyncThunk('/auth/login', async(data) => {
    const res = axiosInstance.post('user/login', data);
    await toast.promise(res,{
        loading : 'Authenticating your credentials',
        success : (data) => {
            return data?.data?.message;
        },
        error : (err) => err?.response?.data?.message || 'Failed to Login'
    });
    return (await res).data;
})

export const Logout = createAsyncThunk('/auth/logout', async () => {
    const res = axiosInstance.get("user/logout");
    await toast.promise(res, {
        loading: 'Logout in progress..',
        success: (data) => {
            return data?.data?.message;
        },
        error: (err) => err?.response?.data?.message || 'Failed to LogOut'
    });
    return (await res).data;
});

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(Login.fulfilled, (state, action) => {
            localStorage.setItem('data' , JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.role;
        })
        .addCase(Logout.fulfilled, (state, action) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = " ";
        })

    }
})


export default authSlice.reducer;








