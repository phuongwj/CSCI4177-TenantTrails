import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function TopNav({ search, setSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleLogout() {
    await logout();
    showToast("Signed out");
    navigate("/signin");
  }

  return (
    <nav className="topnav">
      <div className="logo" onClick={() => navigate("/app")}>TenantTrails</div>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search apartments by address or neighbourhood..."
          value={search ?? ""}
          onChange={e => setSearch && setSearch(e.target.value)}
          disabled={!setSearch}
        />
      </div>
      <div className="nav-right">
        <div className="nav-user" onClick={() => navigate("/profile")}>
          <div className="avatar">{user?.initials}</div>
          <span className="name">{user?.name?.split(" ")[0]}</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Sign out</button>
      </div>
    </nav>
  );
}
