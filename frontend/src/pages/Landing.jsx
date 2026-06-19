import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="view active">
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px" }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--blue-600)", letterSpacing: "-0.02em" }}>TenantTrails</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate("/signin")}>Sign In</button>
            <button className="btn btn-primary" style={{ width: "auto", padding: "9px 20px" }} onClick={() => navigate("/signup")}>Get Started</button>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 40px 60px" }}>
          <div style={{ maxWidth: "680px", textAlign: "center" }}>
            <div style={{ display: "inline-block", padding: "6px 16px", background: "var(--blue-50)", color: "var(--blue-600)", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "24px", letterSpacing: "0.02em" }}>Launching in Halifax, Nova Scotia</div>
            <h1 style={{ fontSize: "52px", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--gray-900)", lineHeight: 1.08, marginBottom: "20px" }}>Know what you're<br />signing before<br />you sign it.</h1>
            <p style={{ fontSize: "18px", color: "var(--gray-500)", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto 36px" }}>Read honest reviews from past tenants. See AI-generated summaries. Make informed decisions about where you live.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
              <button className="btn btn-primary" style={{ width: "auto", padding: "14px 36px", fontSize: "16px" }} onClick={() => navigate("/signup")}>Create Free Account</button>
              <button className="btn btn-secondary" style={{ padding: "14px 36px", fontSize: "16px" }} onClick={() => navigate("/signin")}>Sign In</button>
            </div>

            <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap", textAlign: "center" }}>
              <div style={{ maxWidth: "160px" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>⭐</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--gray-800)", marginBottom: "4px" }}>Verified Reviews</div>
                <div style={{ fontSize: "12px", color: "var(--gray-400)", lineHeight: 1.5 }}>Real ratings with photos and videos from past tenants.</div>
              </div>
              <div style={{ maxWidth: "160px" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>🤖</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--gray-800)", marginBottom: "4px" }}>AI Summaries</div>
                <div style={{ fontSize: "12px", color: "var(--gray-400)", lineHeight: 1.5 }}>Key issues and sentiment extracted from every review.</div>
              </div>
              <div style={{ maxWidth: "160px" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>💬</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--gray-800)", marginBottom: "4px" }}>Ask Questions</div>
                <div style={{ fontSize: "12px", color: "var(--gray-400)", lineHeight: 1.5 }}>Comment on reviews and get answers from past tenants.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
