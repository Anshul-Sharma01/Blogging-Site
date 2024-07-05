import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { createAccount } from "../Redux/Slices/AuthSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { ImGift } from "react-icons/im";


function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ previewImg, setPreviewImg ] = useState("");
    const [ signupData, setSignupData ] = useState({
        username : "",
        name : "",
        email : "",
        password : "",
        avatar : ""
    });

    function handleUserInput(e){
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name] : value
        })
    }

    function getImg(e){
        e.preventDefault();
        const uploadedImg = e.target.files[0];
        if(uploadedImg){
            setSignupData({
                ...signupData,
                avatar : uploadedImg
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImg);
            fileReader.addEventListener("load", function (){
                setPreviewImg(this.result);
            })
        }
    }

    async function createNewAccount(e){
        e.preventDefault();
        if(!signupData.username || !signupData.email || !signupData.password || !signupData.name){
            toast.error("Please fill all the details");
            return;
        }

        if(signupData.username.length < 6){
            toast.error("Username must be atleast 6 characters");
            return;
        }
        
        if(!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            toast.error("Invalid email id");
            return;
        }

        if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
            toast.error("Password should be 6 - 16 character long with atleast a number and special character");
            return;
        }

        const formData = new FormData();
        formData.append("username" ,signupData.username);
        formData.append("email" ,signupData.email);
        formData.append("name" ,signupData.name);
        formData.append("password" ,signupData.password);
        formData.append("avatar" ,signupData.avatar);

        const response = await dispatch(createAccount(formData));
        if(response?.payload?.success){
            navigate("/");
            toast.succes
            setSignupData({
                username : "",
                name: "",
                email : "",
                password: "",
                avatar : ""
            });
            setPreviewImg("");
        }


    }



    return(
        <>
            <HomeLayout>
                <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                    <form nonValidate onSubmit={createNewAccount} className="flex flex-col justify-centergap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black">
                        <h1 className="text-center text-2xl">Registration Page</h1>
                        <label htmlFor="img_upload">
                            {
                                previewImg ? (<img className="w-24 h-24 rounded-full m-auto" src={previewImg}/>) : (
                                    <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                                )
                            }
                        </label>
                        <input onChange={getImg} type="file" className="hidden" name="avatar" id="img_upload" accept=".jpg, .jpeg, .png, .svg" />

                        <div className="flex flex-col gap-1">
                            <label htmlFor="uname" className="font-semibold">Username </label>
                            <input required type="text"name="username" id="uname"  placeholder="Enter your name.." className="bg-transparent px-2 py-1 border" value={signupData.username} onChange={handleUserInput} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold" htmlFor="nm"> Name  </label>
                            <input type="text" required name="name" id="nm" placeholder="Enter your name..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={signupData.name}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input type="email" required name="email" id="email" placeholder="Enter your email..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={signupData.email} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold" htmlFor="password">Password</label>
                            <input type="password" required name="password" id="password" placeholder="Enter your password..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={signupData.password} />
                        </div>

                        <button className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer" type="submit">
                            Create Account
                        </button>
                        <p>
                            Already have an account ? <Link to="/login" className="link text-accent cursor-pointer ">Login</Link>
                        </p>
                    </form>
                </div>
            </HomeLayout>
        </>
    )


}

export default Signup;










