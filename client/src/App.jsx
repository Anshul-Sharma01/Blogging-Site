import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import LoginUser from "./Pages/LoginUser.jsx"
import ProfilePage from "./Pages/ProfilePage.jsx"
import Signup from "./Pages/Signup.jsx"

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginUser/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/user/profile" element={<ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App
