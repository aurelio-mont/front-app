import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context";

function ProtectedRout() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRout