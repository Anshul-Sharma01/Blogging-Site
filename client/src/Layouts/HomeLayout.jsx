import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

function HomeLayout({ children }){

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
                        <ul className=" menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-fit">
                            <li className="w-fit absolute right-2 z-50">
                                <button onClick={hideDrawer}> 
                                    <AiFillCloseCircle size={24}/>
                                </button>
                            </li>
                            <li><Link to='/'> Home </Link></li>
                            <li><Link to='/login'> Login </Link></li>
                        </ul>
                    </div>
                </div>

                {children}

            </div>
        </>
    )
}

export default HomeLayout;


