import { useEffect, useState } from "react";
import axiosInstance from "../Helpers/axiosInstance";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";

function ProfilePage() {
    const [detailsFetched, setDetailsFetched] = useState(false);
    const [details, setDetails] = useState({});

    async function getProfile() {
        try {
            const res = axiosInstance.get("/user/me");
            await toast.promise(res, {
                loading: 'Fetching Profile Details',
                success: (data) => {
                    setDetails(data?.data?.user);
                    return 'Profile data successfully fetched';
                },
                error: 'Failed to Fetch Profile details, please try again'
            });
            setDetailsFetched(true);
        } catch (error) {
            setDetailsFetched(false);
        }
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
                    <form className="flex flex-col gap-4 shadow-lg">
                                                <div className="avatar flex flex-col justify-center items-center relative">
                            <div className="rounded-full w-56 relative group">
                                <img
                                    src={details.avatar?.secure_url || 'default-avatar-url.jpg'}
                                    alt="User Avatar"
                                    className="rounded-full w-full h-full group-hover:blur-sm transition"
                                />
                                <MdOutlineFileUpload
                                    className="absolute inset-0 m-auto text-6xl text-white opacity-0 group-hover:opacity-100 transition"
                                    style={{ pointerEvents: 'none' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="uname" className="text-2xl">Username : </label>
                            <input 
                                type="text" 
                                value={details.username || ''} 
                                className="input input-bordered w-full max-w-xs hover:cursor-not-allowed" 
                                
                            />
                        </div>
                        <div>
                            <label className="text-2xl" htmlFor="name">Name : </label>
                            <input 
                                type="text" 
                                value={details.name || ''} 
                                className="input input-bordered input-info w-full max-w-xs" 
                                
                            />
                        </div>
                        <div>
                            <label className="text-2xl" htmlFor="email">Email : </label>
                            <input 
                                type="email" 
                                value={details.email || ''} 
                                className="input input-bordered input-info w-full max-w-xs" 
                                
                            />
                        </div>
                        <button className="btn btn-outline btn-primary mt-5" type="button">Update Changes</button>
                    </form>
                )}
            </div>
        </HomeLayout>
    );
}

export default ProfilePage;
