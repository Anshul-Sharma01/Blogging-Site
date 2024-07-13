import { useDispatch } from "react-redux";
import { getAllUsers } from "../Redux/Slices/AuthSlice";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import HomeLayout from "../Layouts/HomeLayout";

function DeleteUser(){
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([]);

    async function fetchUsers(){
        const userData = await dispatch(getAllUsers());
        setAllUsers(userData?.payload?.users || []);
        console.log(allUsers);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <HomeLayout>
            <div className="flex flex-row flex-wrap w-full h-screen justify-center items-center gap-10">
                {
                    allUsers.length > 0 ? (
                        allUsers.map((ele) => (
                            <div className="flex items-center border-4 border-black p-3 w-96 ">
                                <div className="w-4/6">
                                    <img src={ele.avatar?.secure_url} alt="User Profile Picture" className="w-[200px] h-[200px] object-cover rounded-full"/>
                                    <p className="mt-2 font-bold text-green-300 underline">Email:</p>
                                    <p className="whitespace-normal break-words">{ele.email}</p>

                                    <button className="btn btn-error mt-5 btn-outline">Delete User</button>
                                </div>
                                <div className="flex flex-col justify-center ml-4 gap-4">
                                    <p> <span className="underline text-green-300">Username</span> : {ele.username}</p>
                                    <p ><span className="underline text-green-300">Name</span> : {ele.name}</p>
                                    <p > <span className="underline text-green-300">Role</span> :  <span className="text-yellow-300">{ele.role}</span></p>
                                    <button className="btn btn-success">Change Role</button>
                                </div>
                                <button></button>
                            </div>
                        ))
                    ) : (
                        <Loader />
                    )
                }
                
            </div>
        </HomeLayout>
    );
}

export default DeleteUser;
