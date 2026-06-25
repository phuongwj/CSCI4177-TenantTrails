import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const res = await fetch(`http://localhost:5003/api/auth/login`, {
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
    <AuthContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
