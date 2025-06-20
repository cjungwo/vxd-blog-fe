import { useContext } from "react";
import { AuthContext } from "../provider/auth-provider";

export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within an AuthProvider');
  }
  return context;
};
