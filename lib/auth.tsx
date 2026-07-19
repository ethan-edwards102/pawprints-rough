"use client";

import * as React from "react";

export interface User {
  name: string;
  email: string;
  role: "admin" | "adopter";
}

/** Mock credentials for the rough draft — no real authentication. */
export const MOCK_ACCOUNTS: Array<User & { password: string }> = [
  {
    name: "Naledi (Staff)",
    email: "admin@pawprints.org",
    password: "letmein",
    role: "admin",
  },
  {
    name: "Sam Visitor",
    email: "sam@example.com",
    password: "woofwoof",
    role: "adopter",
  },
];

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  login: () => false,
  logout: () => {},
});

const STORAGE_KEY = "pawprints-mock-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore corrupted storage in the mock
    }
  }, []);

  const login = React.useCallback((email: string, password: string) => {
    const account = MOCK_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (!account) return false;
    const { password: _pw, ...safeUser } = account;
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return true;
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
