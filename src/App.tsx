import { AuthProvider } from "./context/AuthProvider";
import AppRouter from "./routes/routes";
import { ToastContainer } from 'react-toastify'
export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer autoClose={2000} theme="dark" />
    </AuthProvider>
  )
}