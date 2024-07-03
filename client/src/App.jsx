import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import LoginUser from "./Pages/LoginUser.jsx"

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginUser/>}/>
      </Routes>
    </>
  )
}

export default App
