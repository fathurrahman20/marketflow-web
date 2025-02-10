import APIClient from "@/service/api-client";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  exp: number;
  tokenOrigin: string;
};
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = new APIClient<User>("/auth/me");
  const getUserRefresh = new APIClient<User>("/auth/refresh");

  const loadUser = async () => {
    try {
      const response = await getUser.getAll({
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUser(response.data);
      setIsAuthenticated(!!response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          try {
            await getUserRefresh.getAll({
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
            await loadUser();
          } catch {
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      }
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be user within a AuthProvider");
  }
  return context;
};
