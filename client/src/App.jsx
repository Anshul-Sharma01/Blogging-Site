import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import LoginUser from "./Pages/LoginUser.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import Signup from "./Pages/Signup.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ResetToken from "./Pages/ResetToken.jsx";
import ChangePassword from "./Pages/ChangePassword.jsx";
import AddUser from "./AdminPages/AddUser.jsx";
import RequireAuth from "./Components/Auth/RequireAuth.jsx";
import Denied from "./Pages/Denied.jsx";
import axiosInstance from "./Helpers/axiosInstance";
import { setLoading } from "./Redux/Slices/AuthSlice.js";
import NotFound from "./Pages/NotFound.jsx";

function App() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await axiosInstance.get('/user/me');
                // Update your Redux state with the user's info if they are authenticated
                if (response.data.isLoggedIn) {
                    // Dispatch actions to update the authentication state
                }
            } catch (error) {
                // Handle error if needed
            } finally {
                dispatch(setLoading(false));
            }
        };

        verifyAuth();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Or return a loading spinner/component
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/reset/:resetToken" element={<ResetToken />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/denied" element={<Denied />} />
                <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
                    <Route path="/user/profile" element={<ProfilePage />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                    <Route path="/adduser" element={<AddUser />} />
                </Route>

                <Route path="*" element={<NotFound/>} />
            </Routes>
        </>
    );
}

export default App;
