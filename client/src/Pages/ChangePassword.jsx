import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChangePasswordThunk } from "../Redux/Slices/AuthSlice";



function ChangePassword(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ oldPassword, setOldPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('oldPassword',oldPassword);
        // formData.append('newPassword', newPassword);

        const res = await dispatch(ChangePasswordThunk({oldPassword, newPassword}));
        console.log(res);
        if(res?.meta?.requestStatus === "fulfilled"){
            navigate("/");
        }
    }


    return(
        <>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form onSubmit={handleSubmit} className="flex  flex-col justify-centergap-3 rounded-lg p-10 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-3xl m-4">Change Password</h1>
                    <div className="flex flex-col gap-1">
                        <input type="text" name="password" placeholder="Enter old password" className="bg-transparent px-4 py-2 border m-5" onChange={(e) => {
                            setOldPassword(e.target.value);
                        }}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <input type="text" name="password" placeholder="Enter new password" className="bg-transparent px-4 py-2 border m-5" onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-outline mt-5" >
                        Submit
                    </button>
                    <p  className="p-2">Go Back ? <Link to="/" className="link text-accent cursor-pointer">Home</Link></p>
                </form>
            </div>
        </>
    )
}


export default ChangePassword;
