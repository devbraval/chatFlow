import "./PhoneLogin.css";
import { Link } from "react-router-dom";

export default function PhoneLogin() {
  return (
    <div className="container">
      <div className="card">
        <h1>ChatApp</h1>
        <p>
          Enter your E-mail to use the application.
        </p>

        <label>Email</label>

        <div className="call-container">

          <input
            type="text"
            className="right-small-card"
            placeholder="Enter your Email"
          />
        </div>

        <button className="btn">Next</button>
        <h6>New user <Link to="/signup" id="link">Create Account here</Link></h6>
      </div>
    </div>
  );
}