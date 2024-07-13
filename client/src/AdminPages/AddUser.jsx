import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { addUser } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";


function AddUser(){

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [ previewImg, setPreviewImg ] = useState("");
    const [ newUserData, setNewUserData ] = useState({
        username : "",
        name : "",
        email : "",
        password : "",
        avatar : "",
        role : ""
    });

    function handleUserInput(e){
        const {name, value} = e.target;
        setNewUserData({
            ...newUserData,
            [name] : value
        })
    }

    function getImg(e){
        e.preventDefault();
        const uploadedImg = e.target.files[0];
        if(uploadedImg){
            setNewUserData({
                ...newUserData,
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
        if(!newUserData.username || !newUserData.email || !newUserData.password || !newUserData.name){
            toast.error("Please fill all the details");
            return;
        }

        if(newUserData.username.length < 6){
            toast.error("Username must be atleast 6 characters");
            return;
        }
        
        if(!newUserData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            toast.error("Invalid email id");
            return;
        }

        if(!newUserData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
            toast.error("Password should be 6 - 16 character long with atleast a number and special character");
            return;
        }

        const formData = new FormData();
        formData.append("username" ,newUserData.username);
        formData.append("email" ,newUserData.email);
        formData.append("name" ,newUserData.name);
        formData.append("password" ,newUserData.password);
        formData.append("avatar" ,newUserData.avatar);
        formData.append("role" ,newUserData.role);

        const response = await dispatch(addUser(formData));
        if(response?.payload?.success){
            navigate("/");
            toast.succes
            setNewUserData({
                username : "",
                name: "",
                email : "",
                password: "",
                avatar : "",
                role:" "
            });
            setPreviewImg("");
        }


    }

    return(
        <>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                    <form onSubmit={createNewAccount}  className="flex flex-col justify-centergap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black">
                        <h1 className="text-center text-2xl">Add New User</h1>
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
                            <input required type="text"name="username" id="uname"  placeholder="Enter user name.." className="bg-transparent px-2 py-1 border" value={newUserData.username} onChange={handleUserInput} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold" htmlFor="nm"> Name  </label>
                            <input type="text" required name="name" id="nm" placeholder="Enter user name..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={newUserData.name}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input type="email" required name="email" id="email" placeholder="Enter user email..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={newUserData.email} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold" htmlFor="password">Password</label>
                            <input type="password" required name="password" id="password" placeholder="Enter user password..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={newUserData.password} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold" htmlFor="role">Role</label>
                            <input type="text" required name="role" id="role" placeholder="Enter user role..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={newUserData.role} />
                        </div>

                        <button className="mt-5 bg-green-600 hover:bg-green-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer" type="submit">
                            Add New User
                        </button>
                </form>
            </div>
        </>
    )
}


export default AddUser;




