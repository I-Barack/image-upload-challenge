import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextUtils";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("Trying to use AuthContext beyond its scope!");
  }

  return context;
};
