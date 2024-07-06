import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";


function ProfilePage() {
    const [detailsFetched, setDetailsFetched] = useState(false);
    const [details, setDetails] = useState({});

    function getProfile(){
        const res = axiosInstance.get("/user/me");
        toast.promise(res,{
            loading : 'Fetching Profile Details',
            success : (data) => {
                setDetails(data?.data?.user);
                return 'Profile Successfully Fetched'
            },
            error : 'Failed to Fetch Profile'
        })
        setDetailsFetched(true);
    }
    



    useEffect(() => {
        getProfile();
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col overflow-x-auto items-center justify-center h-[100vh] ">
                <h1 className="text-4xl font-bold">User Details</h1>
                <br />
                {detailsFetched && (
                    <form className="flex flex-col gap-4 shadow-lg p-10 border-solid border-2 border-gray-500 rounded-3xl" >
                        <div className="flex flex-col justify-center items-center">
                                <img
                                    src={details.avatar?.secure_url}
                                    alt="User Avatar"
                                    className=" rounded-full w-52 "
                                />
                        </div>
                        <div>
                            <label htmlFor="uname" className="text-2xl">Username : </label>
                            <input 
                                type="text" 
                                value={details.username || ''} 
                                className="input input-bordered w-full max-w-xs " 
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-2xl" htmlFor="name">Name : </label>
                            <input 
                                type="text" 
                                value={details.name} 
                                className="input input-bordered w-full max-w-xs " 
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-2xl" htmlFor="email">Email : </label>
                            <input 
                                type="email" 
                                value={details.email || ''} 
                                className="input input-bordered w-full max-w-xs " 
                                readOnly
                            />
                        </div>
                        <div className="mt-5">
                            <Link to="/user/update-profile" className="btn btn-outline btn-primary w-full">Update Profile</Link>
                        </div>
                    </form>
                )}
            </div>
        </HomeLayout>
    );
}

export default ProfilePage;
