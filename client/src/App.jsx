import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import LoginUser from "./Pages/LoginUser.jsx"
import ProfilePage from "./Pages/ProfilePage.jsx"
import Signup from "./Pages/Signup.jsx"
import ResetPassword from "./Pages/ResetPassword.jsx"
import ResetToken from "./Pages/ResetToken.jsx"
import ChangePassword from "./Pages/ChangePassword.jsx"

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginUser/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>
        <Route path="/reset/:resetToken" element={<ResetToken/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/user/profile" element={<ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App
