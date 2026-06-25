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

  async function signup(name, email, password, confirmPassword) {
    const res = await fetch("http://localhost:5003/api/auth/signup", {
      method: "POST", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    if (!res.ok) {
      throw new Error("Error signing up");
    }
    setUser(await res.json())
  }

  async function logout() { 
    const res = await fetch("http://localhost:5003/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    })

    if (!res.ok) {
      throw new Error("Error logging out");
    }
    setUser(null); 
  }

  return (
    <AuthContext.Provider value={{ user, logout, login, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
