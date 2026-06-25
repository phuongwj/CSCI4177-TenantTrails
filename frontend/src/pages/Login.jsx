import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function handleLogin() {
    let valid = true;
    setEmailErr(false);
    setPassErr(false);
    if (!email.trim() || !email.includes("@")) { setEmailErr(true); valid = false; }
    if (!password) { setPassErr(true); valid = false; }
    if (!valid) return;

    try {
      await login(email, password);

      navigate("/app");
      showToast("Welcome back!");
    } catch (error) {
      setPassErr(true)
      showToast("Error logging in");
    }
    
  }

  return (
    <div className="view active">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-logo">TenantTrails</div>
          <div className="auth-sub">See what past tenants had to say, before you sign.</div>
          <div className={"form-field" + (emailErr ? " error" : "")}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email}
              onChange={e => { setEmail(e.target.value); setEmailErr(false); }} />
            <div className="error-text">Please enter a valid email</div>
          </div>
          <div className={"form-field" + (passErr ? " error" : "")}>
            <label>Password</label>
            <input type="password" placeholder="Your password" value={password}
              onChange={e => { setPassword(e.target.value); setPassErr(false); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
            <div className="error-text">Invalid email or password</div>
          </div>
          <button className="btn btn-primary" onClick={handleLogin} style={{ marginTop: "8px" }}>Sign In</button>
          <div className="auth-link">Don't have an account? <Link to="/signup">Create one</Link></div>
          <div className="auth-hint">Demo: <strong>alex@dal.ca</strong> / <strong>password123</strong></div>
        </div>
      </div>
    </div>
  );
}
