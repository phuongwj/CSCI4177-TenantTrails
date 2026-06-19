import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { users, getInitials } from "../data/mockData";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState({});
  const { setUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleSignup() {
    const e = {};
    if (!name.trim()) e.name = true;
    if (!email.trim() || !email.includes("@")) e.email = true;
    if (!password || password.length < 6) e.password = true;
    if (password !== confirm) e.confirm = true;
    setErr(e);
    if (Object.keys(e).length > 0) return;
    if (users.find(u => u.email === email.trim())) { showToast("Email already registered", "error"); return; }
    const newUser = { id: Date.now(), name: name.trim(), email: email.trim(), password, initials: getInitials(name) };
    users.push(newUser);
    setUser(newUser);
    navigate("/app");
    showToast("Account created. Welcome!", "success");
  }

  function clr(field) { setErr(prev => { const n = { ...prev }; delete n[field]; return n; }); }

  return (
    <div className="view active">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-logo">TenantTrails</div>
          <div className="auth-sub">Create your account to submit reviews and comments.</div>
          <div className={"form-field" + (err.name ? " error" : "")}>
            <label>Full name</label>
            <input type="text" placeholder="Your name" value={name}
              onChange={e => { setName(e.target.value); clr("name"); }} />
            <div className="error-text">Name is required</div>
          </div>
          <div className={"form-field" + (err.email ? " error" : "")}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email}
              onChange={e => { setEmail(e.target.value); clr("email"); }} />
            <div className="error-text">Please enter a valid email</div>
          </div>
          <div className={"form-field" + (err.password ? " error" : "")}>
            <label>Password</label>
            <input type="password" placeholder="At least 6 characters" value={password}
              onChange={e => { setPassword(e.target.value); clr("password"); }} />
            <div className="error-text">Password must be at least 6 characters</div>
          </div>
          <div className={"form-field" + (err.confirm ? " error" : "")}>
            <label>Confirm password</label>
            <input type="password" placeholder="Repeat password" value={confirm}
              onChange={e => { setConfirm(e.target.value); clr("confirm"); }} />
            <div className="error-text">Passwords do not match</div>
          </div>
          <button className="btn btn-primary" onClick={handleSignup} style={{ marginTop: "8px" }}>Create Account</button>
          <div className="auth-link">Already have an account? <Link to="/signin">Sign in</Link></div>
        </div>
      </div>
    </div>
  );
}
