import type { User } from "@/assets/types/user.types";
import { createContext } from "react";
type AuthContextType = {
    user: Partial<User> | null;
    login: (phone: number) => void;
    logout: () => void;
};
export const AuthContext = createContext<AuthContextType | null>(null)