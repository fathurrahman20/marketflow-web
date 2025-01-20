// import APIClient from "@/service/api-client";
// import { createContext, ReactNode, useContext, useState } from "react";

// type UserLoginRequest = {
//   email: string;
//   password: string;
// };
// type User = {
//   name: string;
//   email: string;
//   role: string;
// };
// interface AuthContextType {
//   user: User;
//   login: (user: UserLoginRequest) => void;
//   logout: () => void;
// }
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User>({} as User);
//   const apiClient = new APIClient("/users/login");

//   const login = async ({ email, password }: UserLoginRequest) => {
//     const res = await apiClient.post(
//       { email, password },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );

//     setUser(res.data);
//     console.log("ReSpOnSe: ", res);
//     // console.log("useR: ", user);
//   };

//   const logout = () => {
//     // setUser("");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   return context;
// // };
// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be user within a AuthProvider");
//   }
//   return context;
// };
