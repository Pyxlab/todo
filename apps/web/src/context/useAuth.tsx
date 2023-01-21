import { useContext } from "react";
import { AuthContext } from "./Auth";

export function useAuth()  {
    return useContext(AuthContext)
}