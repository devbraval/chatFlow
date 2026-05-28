import "./App.css"
import PhoneLogin from './PhoneLogin'
import SignUp from "./SignUp";
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<PhoneLogin />}/>
      <Route path="/sign-up" element={<SignUp/>}/>
    </Routes>
     
    </>
  )
}

export default App
