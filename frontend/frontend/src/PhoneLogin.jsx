import "./PhoneLogin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PhoneLogin() {
  const [number,setNumber] = useState("");
  const onSumbit = async()=>{
    const response = await fetch()
  }
  return (
    <div className="container">
      <div className="card">
        <h1>ChatApp</h1>
        <p>
          Enter your E-mail to use the application.
        </p>

        
        

        <div className="call-container" >
          <label htmlFor="email">Email</label>

          <input
            type="text"
            className="right-small-card"
            placeholder="Enter your Email"
            name="email"
            onClick={(e)=>setNumber(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className="right-small-card" placeholder="Enter your password" />
        </div>
        
        <div>
          <FontAwesomeIcon
            icon={faEye}
            style={{ color: "black" }}
            />
        </div>



        <button className="btn">Next</button>
        <h6>New user <Link to="/signup" id="link">Create Account here</Link></h6>
      </div>
    </div>
  );
}