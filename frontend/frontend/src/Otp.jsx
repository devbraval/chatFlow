import "./Otp.css"
import { useRef, useState } from "react";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join("");
    console.log("OTP:", otpCode);
  };

  return (
    <div className="otp-page">
  <div className="otp-card">
    <h2>Verify OTP</h2>

    <div className="otp-boxes">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          ref={(el) => (inputs.current[index] = el)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>

    <button onClick={handleSubmit}>Verify</button>
  </div>
</div>
  );
};

export default OTP;