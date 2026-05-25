import { useState, useEffect, useRef } from "react";
import "./OtpVerification.css";

function OtpVerification({ phoneNumber, countryCode = "+91", onBack, onSuccess }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");

  const otpRefs = useRef([]);

  // Auto-focus countdown timer
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Focus first input box on load
  useEffect(() => {
    if (otpRefs.current[0]) {
      setTimeout(() => otpRefs.current[0].focus(), 150);
    }
  }, []);

  // Handle digit inputs
  const handleOtpChange = (index, value) => {
    setError("");
    const val = value.replace(/\D/g, "");
    if (!val) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    const digit = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto focus next box
    if (index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Handle backspace navigation
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0 && otpRefs.current[index - 1]) {
        otpRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Submit OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits of the confirmation code.");
      return;
    }

    setLoading(true);
    setError("");

    console.log(`[AUTH-OTP] Verifying code ${code} for phone ${countryCode} ${phoneNumber}`);

    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  // Resend SMS
  const handleResendSMS = () => {
    setResendLoading(true);
    setError("");
    console.log(`[AUTH-OTP] Requesting code resend for: ${countryCode} ${phoneNumber}`);
    
    setTimeout(() => {
      setResendLoading(false);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      if (otpRefs.current[0]) otpRefs.current[0].focus();
    }, 1200);
  };

  return (
    <div className="otp-step-content">
      <button type="button" className="otp-back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </button>

      <div className="otp-header">
        <h1>Verify Code</h1>
        <p>We've sent a 6-digit confirmation SMS to</p>
        <div className="otp-number-display">{countryCode} {phoneNumber}</div>
      </div>

      {error && (
        <div className="otp-error-alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* OTP Entry Grid */}
        <div className="otp-grid">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="otp-digit-field"
              value={digit}
              ref={(el) => (otpRefs.current[index] = el)}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
            />
          ))}
        </div>

        {/* Resend Actions */}
        <div className="otp-resend-section">
          {timer > 0 ? (
            <span>Resend SMS in <span className="otp-timer-count">{timer}s</span></span>
          ) : (
            <button 
              type="button" 
              className="otp-resend-btn" 
              onClick={handleResendSMS}
              disabled={resendLoading}
            >
              {resendLoading ? "Sending SMS..." : "Resend SMS"}
            </button>
          )}
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          className="otp-submit-btn"
          disabled={loading || otp.join("").length < 6}
        >
          {loading ? <span className="otp-spinner"></span> : "Verify & Continue"}
        </button>
      </form>
    </div>
  );
}

export default OtpVerification;
