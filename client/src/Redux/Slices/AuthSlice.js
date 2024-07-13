import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate } from "react-router-dom";

const initialState = {
    isLoggedIn:false,
    role: " ",
    data:  {},
    loading: true // Add loading state
};


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

export const addUser = createAsyncThunk("/auth/admin/adduser", async(data) => {
    const res = axiosInstance.post('user/adduser', data);
    await toast.promise(res, {
        loading : 'Creating new user account',
        success : (data) => {
            return data?.data?.message;
        },
        error : (err) => err?.response?.data?.message || 'Failed to Add New User, Please try again...'
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

export const ResetPasswordThunk = createAsyncThunk("/auth/reset", async(data) => {
    const res = axiosInstance.post("user/reset",data);
    await toast.promise(res,{
        loading : 'Sending Reset Password Link to Your Email',
        success : (data) => {
            return data?.data?.message;
        },
        error: (err) => err?.response?.data?.message || 'Error , Please try again'
    });
    return (await res).data;
})

export const ResetTokenThunk = createAsyncThunk("/auth/reset-password",async ({ resetToken, password }) => {
    const res = axiosInstance.post(`user/reset/${resetToken}`, {password});
    await toast.promise(res,{
        loading : 'Resetting your password',
        success : (data) => {
            return data?.data?.message; 
        },
        error : (err) => err?.response?.data?.message || 'Error occurred in resetting your password'
    });
    return (await res).data;
})


export const ChangePasswordThunk = createAsyncThunk("/auth/changepassword",async({oldPassword, newPassword}) => {
    const res = axiosInstance.post("user/change-password", {oldPassword, newPassword});
    toast.promise(res,{
        loading : 'Changing your password',
        success : (data) => {
            return data?.data?.message;
        },
        error : (err) => err?.response?.data?.message || 'Error occurred in changing your password'
    });
    return (await res).data;
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.loading = true;
            })
            .addCase(Login.fulfilled, (state, action) => {
                // localStorage.setItem('data', JSON.stringify(action.payload.user));
                // localStorage.setItem('isLoggedIn', true);
                // localStorage.setItem('role', action.payload.user.role);
                state.isLoggedIn = true;
                state.data = action.payload.user;
                state.role = action.payload.user.role;
                state.loading = false;
            })
            .addCase(Login.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                // localStorage.setItem('data', JSON.stringify(action.payload.user));
                // localStorage.setItem('isLoggedIn', true);
                // localStorage.setItem('role', action.payload.user.role);
                state.isLoggedIn = true;
                state.data = action.payload.user;
                state.role = action.payload.user.role;
                state.loading = false;
            })
            .addCase(createAccount.rejected, (state) => {
                state.loading = false;
            })
            .addCase(Logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(Logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = " ";
                state.loading = false;
            })
            .addCase(Logout.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;








