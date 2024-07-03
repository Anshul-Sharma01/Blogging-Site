import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || " ",
    data : localStorage.getItem('data') || {}
}


export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    try{
        const result = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading : 'Creating Your Account !!',
            success : (data) => {
                return data?.data?.message;
            },
            error : 'Failed to Create Account, Please try again...'
        })
        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})


export const Login = createAsyncThunk('/auth/login', async(data) => {
    try{
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading : 'Authenticating your credentials',
            success : (data) => {
                return data?.data?.message;
            },
            error : 'Failed to Login'
        });
        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})

export const Logout = createAsyncThunk('/auth/logout', async(req, res) => {
    try{
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading : 'Logout in progress..',
            success : (data) => {
                return data?.data?.message;
            },
            error :'Failed to LogOut'
        })
        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})

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








