import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";


function ProfilePage() {

    const [ stateChange, setStateChange ] = useState(false);

    const [detailsFetched, setDetailsFetched] = useState(false);
    const [ profileName, setProfileName ] = useState('');
    const [ ogName, setOgName ] = useState("");
    const [details, setDetails] = useState({});

    function getProfile(){
        const res = axiosInstance.get("/user/me");
        toast.promise(res,{
            loading : 'Fetching Profile Details',
            success : (data) => {
                setDetails(data?.data?.user);
                setOgName(data?.data?.user?.name);
                setProfileName(data?.data?.user?.name);
                return 'Profile Successfully Fetched'
            },
            error : 'Failed to Fetch Profile'
        })
        setDetailsFetched(true);
    }


    function handleStateChange(e){
        e.preventDefault();
        setStateChange(true);
        toast.success('You can edit Your name and profile pic now');
        const btn = document.getElementById('updateBtn');
        btn.innerHTML = 'Submit Changes';
        const inp = document.getElementById('nameInp');
        inp.removeAttribute('readOnly');
    }
    
    const handleCancelChange = (e) => {
        e.preventDefault();
        toast.error('Changes Discarded !!');
        setProfileName(ogName);
        
        const btn = document.getElementById('updateBtn');
        btn.innerHTML = 'Update Profile ?'
        const inp = document.getElementById('nameInp');
        inp.setAttribute('readOnly', true);

        setStateChange(false);
    };
    



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

                                <div className="rounded-full w-56 relative group">
                                <img
                                    src={details.avatar?.secure_url || 'default-avatar-url.jpg'}
                                    alt="User Avatar"
                                    className={`rounded-full w-56 relative group ${stateChange ? 'group-hover:blur-sm' : ''}`}
                                />
                                {
                                    stateChange && (
                                        <MdOutlineFileUpload
                                            className="absolute inset-0 m-auto text-6xl text-white opacity-0 group-hover:opacity-100 transition"
                                            
                                        />

                                    )
                                }
                            </div>
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
                                value={profileName || " "}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="input input-bordered w-full max-w-xs " 
                                id="nameInp"
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
                                <button className="btn btn-outline btn-primary w-full" onClick={handleStateChange} id="updateBtn">
                                    Update Profile
                                </button>
                                {
                                    stateChange && (
                                        <button onClick={handleCancelChange} className="btn btn-outline btn-secondary w-full mt-5">Cancel Changes</button>
                                    )
                                }
                            
                        </div>
                    </form>
                )}
            </div>
        </HomeLayout>
    );
}

export default ProfilePage;
