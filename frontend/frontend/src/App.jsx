import "./App.css"
import Otp from "./Otp";
import PhoneLogin from './PhoneLogin'
import SignUp from "./SignUp";
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<PhoneLogin />}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/otp" element={<Otp/>}/>
    </Routes>
     
    </>
  )
}

export default App
