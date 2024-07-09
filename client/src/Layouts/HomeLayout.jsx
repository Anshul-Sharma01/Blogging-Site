import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../Redux/Slices/AuthSlice.js";

function HomeLayout({ children }){


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    const role = useSelector((state) => state?.auth?.role);

    async function handleLogOut(e){
        e.preventDefault();
        const res = await dispatch(Logout());
        if(res?.meta?.requestStatus === 'fulfilled'){
            navigate("/login");
        }
    }

    function changeWidth(){
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer(){
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 0;
    }


    return(
        <>
            <div className="min-h-[90vh]">
                <div className="drawer absolute left-0 z-50 w-fit">
                    <input type="checkbox" id="my-drawer" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="cursor-pointer relative ">
                            <FiMenu size={"32px"} className="font-bold text-white m-4" onClick={changeWidth}/>
                        </label>
                    </div>
                    <div className="drawer-side w-0">
                        <label htmlFor="my-drawer" className="drawer-overlay"></label>
                        <ul className="gap-4 menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-fit">
                            <li className="w-fit absolute right-2 z-50">
                                <button onClick={hideDrawer}> 
                                    <AiFillCloseCircle size={24}/>
                                </button>
                            </li>
                            <li><Link to='/'> Home </Link></li>
                            {
                                !isLoggedIn && (
                                    <li className=" mt-4 w-full flex flex-col items-center">
                                        <button className="btn btn-outline btn-primary px-4 py-1 font-semibold rounded-md w-full mb-2"> 
                                            <Link to="/login"> LogIn </Link>
                                        </button>
                                        <button className="btn btn-outline btn-secondary px-4 py-1 font-semibold rounded-md w-full mb-2">
                                            <Link to="/signup"> SignUp</Link>
                                        </button>
                                    </li>
                                )
                            }
                            {
                                isLoggedIn && role === 'USER' && (
                                    <li className="flex flex-col gap-4">
                                        <Link to='/adduser'>Add User</Link>
                                        <Link to='/deleteuser'>Delete User</Link>
                                    </li>
                                )
                            }
                            {
                                isLoggedIn && (
                                    <li className="flex flex-col gap-4">
                                        <Link to="/user/profile"> Profile </Link>
                                        <Link to="/blog/all"> All Blogs </Link>
                                        <Link to="/blogs/myblogs"> My Blogs </Link>
                                        <Link to="/blogs/create">Create new Blog</Link>
                                        <Link to="/reset" className="btn btn-outline btn-accent cursor-pointer"> Reset Password </Link>
                                        <Link to="/change-password" className="btn btn-primary"> Change Password </Link>
                                        <button onClick={handleLogOut} className="btn btn-outline btn-danger px-4 py-1 font-semibold rounded-md w-full mb-2">
                                            LogOut
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

                {children}

            </div>
        </>
    )
}

export default HomeLayout;


