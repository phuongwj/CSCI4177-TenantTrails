import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5003/api/auth/me", { credentials: "include", })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data ?? null))
      .then(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const res = await fetch("http://localhost:5003/api/auth/login", {
      method: "POST", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      throw new Error("Error logging in");
    }
    setUser(await res.json())
  }

  function logout() { setUser(null); }
  return (
    <AuthContext.Provider value={{ user, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
