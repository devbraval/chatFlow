import { useState } from "react";
import "./SignUp.css";

const PRESET_AVATARS = [
  { id: 1, color: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)", char: "🦊" },
  { id: 2, color: "linear-gradient(135deg, #4E65FF 0%, #92EFFD 100%)", char: "🐬" },
  { id: 3, color: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", char: "🐼" },
  { id: 4, color: "linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)", char: "🦄" },
  { id: 5, color: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)", char: "🔮" },
  { id: 6, color: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)", char: "🦁" },
];

function SignUp({ onSubmit, onBack }) {
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("Hey there! I am using WhatsApp.");
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setError("");
    const val = e.target.value;
    if (val.length <= 25) {
      setFullName(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please provide your name.");
      return;
    }

    setLoading(true);
    console.log(`[SIGNUP] Profile Saved: Name: "${fullName}", Bio: "${status}", Avatar: ${selectedAvatar.char}`);

    setTimeout(() => {
      setLoading(false);
      onSubmit({ fullName, status, avatar: selectedAvatar });
    }, 1500);
  };

  return (
    <div className="signup-step-content">
      {/* Back to OTP */}
      <button type="button" className="signup-back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </button>

      <div className="signup-header">
        <h1>Profile Info</h1>
        <p>Please provide your name and an optional profile picture to complete sign up.</p>
      </div>

      {error && (
        <div className="signup-error-alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="signup-form">
        {/* Avatar Selection Area */}
        <div className="avatar-section">
          <div 
            className="current-avatar-circle"
            style={{ background: selectedAvatar.color }}
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            title="Click to change avatar"
          >
            <span className="current-avatar-char">{selectedAvatar.char}</span>
            <div className="avatar-edit-badge">📷</div>
          </div>
          
          {showAvatarPicker && (
            <div className="avatar-picker-dropdown">
              <div className="avatar-picker-header">
                <span>Choose an Avatar</span>
                <button type="button" className="close-picker-btn" onClick={() => setShowAvatarPicker(false)}>×</button>
              </div>
              <div className="avatar-grid">
                {PRESET_AVATARS.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`avatar-choice-item ${selectedAvatar.id === avatar.id ? "selected" : ""}`}
                    style={{ background: avatar.color }}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatarPicker(false);
                    }}
                  >
                    {avatar.char}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Full Name Input (WhatsApp Profile rules) */}
        <div className="signup-form-group">
          <div className="label-row">
            <label className="signup-form-label">Full Name</label>
            <span className="char-count">{25 - fullName.length}</span>
          </div>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Your name"
              className="signup-input-field"
              value={fullName}
              onChange={handleNameChange}
              autoFocus
              required
            />
            <span className="input-icon-decor">👤</span>
          </div>
        </div>

        {/* Status / Bio Input */}
        <div className="signup-form-group">
          <label className="signup-form-label">Status</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="About status..."
              className="signup-input-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <span className="input-icon-decor">✍️</span>
          </div>
        </div>

        {/* Finish CTA */}
        <button 
          type="submit" 
          className="signup-submit-btn"
          disabled={loading || !fullName.trim()}
        >
          {loading ? <span className="signup-spinner"></span> : "Finish Setup"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
