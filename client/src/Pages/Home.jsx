import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

function Home(){
    return(
        <>
            <HomeLayout>
                <div className="flex flex-row gap-2 justify-center items-center w-full h-screen p-40">
                    <div>
                        <h1 className="text-4xl w-4/6 text-wrap text-left">
                            World's best Blogging Site, because we know
                            <span className="text-yellow-300">&nbsp;Blogs</span>
                            <br />
                            are not just the another source of information
                        </h1>

                        <button className="btn bg-yellow-500 text-black rounded-lg border-black border-2 hover:bg-yellow-600 cursor-pointer mt-5">
                            <Link to='/blogs/create'> 
                                Create Your first Blog 
                        
                            </Link>
                        </button>
                    </div>
                    <div>
                        <img src="https://img.freepik.com/free-vector/blogging-illustration-concept_114360-788.jpg?t=st=1720861701~exp=1720865301~hmac=b58aa0c77330bd9f85b32f504299b6f3c9cd3c8e150b6acb1506009ea2957bd1&w=900" alt="" className="2/6 max-w-full w-[650px]"/>
                    </div>
                </div>
            </HomeLayout>
        </>
    )
}

export default Home;


