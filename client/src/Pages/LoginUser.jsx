import HomeLayout from "../Layouts/HomeLayout.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "../Redux/Slices/AuthSlice.js";
import { useDebugValue } from "react";


function LoginUser(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ loginData, setLoginData ] = useState({
        email : "",
        password : ""
    })

    
    function handleInput(e){
        const { name, value } = e.target;
        setLoginData({
            ...loginData, [name] : value
        })
    }

    async function onLogin(e) {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }
        
        const response = await dispatch(Login(loginData));
        if (response?.meta?.requestStatus === 'fulfilled') {
            navigate("/");
        } else {
            toast.error("Login failed. Please try again.");
        }
    }


    return(

        <>
            <HomeLayout>
                <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                    <form onSubmit={onLogin} className="flex flex-col justify-center gap-4 rounded-lg p-5 text-white w-96 shadow-md">
                        <h1 className="text-center text-3xl font-bold">Login Page</h1>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input type="email" required name="email" placeholder="enter your email.." className="bg-transparent px-2 py-1 border" onChange={handleInput}  value={loginData.email}/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className='font-semibold'> Password </label>
                            <input 
                                type="password" 
                                required
                                name="password"
                                id="password"
                                placeholder="Enter your password.."
                                className="bg-transparent px-2 py-1 border"
                                onChange={handleInput}
                                value={loginData.password}
                            />
                        </div>

                        <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                            Login
                        </button>
                        <p>Don't have an account ? <Link to="/signup" className="link text-accent cursor-pointer">Create new Account</Link></p>
                        <p><Link to="/reset" className="link text-accent cursor-pointer">Forgot Password ?</Link></p>
                    </form>
                </div>
            </HomeLayout>
        </>
    )
}

export default LoginUser;



