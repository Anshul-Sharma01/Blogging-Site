import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch  } from "react-redux";
import { ResetPasswordThunk } from "../Redux/Slices/AuthSlice";



function ResetPassword(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ userEmail, setUserEmail ] = useState("");

    function getEmail(){
        let userData = localStorage.getItem('data');
        userData = JSON.parse(userData);
        setUserEmail(userData.email);
    }

    async function handleSubmit(e){
        e.preventDefault();
        

        const formData = new FormData();
        formData.append("email", userEmail);

        const res = dispatch(ResetPasswordThunk({email : userEmail}));
        console.log(res);
        if(res?.meta?.requestStatus === 'fulfilled'){
            navigate("/");
        }
    }

    useEffect(() => {
        getEmail();
    },[])


    return(
        <>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form onSubmit={handleSubmit} className="flex flex-col justify-centergap-3 rounded-lg p-10 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-3xl m-4">Reset Password</h1>
                    <div className="flex flex-col gap-1">
                        <input type="email" name="email" placeholder="Email" className="bg-transparent px-4 py-2 border" value={userEmail} readOnly/>
                        <p className="text-slate-500">*The Password reset link will be sent to this email</p>
                    </div>
                    <button type="submit" className="btn btn-primary btn-outline mt-5" >
                        Submit
                    </button>
                    <p className="p-2">want to change email ? <Link className="link text-accent cursor-pointer" to="/user/update-profile">Update Profile</Link></p>
                    <p  className="p-2">Go Back ? <Link to="/" className="link text-accent cursor-pointer">Home</Link></p>
                </form>
            </div>
        </>
    )
}


export default ResetPassword;



