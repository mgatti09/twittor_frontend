import { useContext } from "react";
import { AuthContext } from "../utils/contexts";

export default function useAuth() {
  return useContext(AuthContext);
}
