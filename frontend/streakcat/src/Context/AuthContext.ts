import { createContext } from "react";
import type { AuthContextType } from "../Types/types";


export const AuthContext = createContext<AuthContextType | undefined>(undefined)
