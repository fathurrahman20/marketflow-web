// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/auth-context";
import Routers from "./routes/router";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Toaster />
        <Routers />
      </AuthProvider>
    </>
  );
}

export default App;
