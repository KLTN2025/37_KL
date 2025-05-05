/* app/context/AuthContext.tsx */
"use client";

import { createContext, useContext } from "react";
import { useSession, signOut } from "next-auth/react";

interface User {
  phone?: string | null;
  id: string;
  name?: string | null;
  email?: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const user = session?.user as User | null;

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}