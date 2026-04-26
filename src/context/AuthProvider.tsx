import { useState } from "react";
import { type User } from "../assets/types/user.types";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Partial<User>>()
    function login(userData: Partial<User>) {
        setUser(userData)
    }
    function logout() {
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}