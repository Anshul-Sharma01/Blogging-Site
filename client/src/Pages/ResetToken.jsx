import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ResetTokenThunk } from "../Redux/Slices/AuthSlice";
import { useState } from "react";



function ResetToken(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ newPassword, setNewPassword ] = useState("");

    const { resetToken } = useParams();
    console.log(resetToken);

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append('resetToken',resetToken);
        formData.append('password',newPassword);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    

        const res = await dispatch(ResetTokenThunk({ resetToken, password: newPassword }));
        console.log(res);

        navigate("/");
    }
    

    return(
        <>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form onSubmit={handleSubmit} className="flex flex-col justify-centergap-3 rounded-lg p-10 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-3xl m-4">Reset Password</h1>
                    <div className="flex flex-col gap-1">
                        <input type="text" name="password" placeholder="Enter new password" className="bg-transparent px-4 py-2 border" onChange={(e) => {
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

export default ResetToken;



