import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/auth-context";
import Routers from "./routes/router";

function App() {
  return (
    <AuthProvider>
      <>
        <Toaster />
        <Routers />
      </>
    </AuthProvider>
  );
}

export default App;
