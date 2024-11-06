import { Navigate } from "react-router-dom";
import Form from "../../components/Form"
import DfaultLayout from "../../layout/DfaultLayout"
import { useAuthContext } from "../../context";

function Login() {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }
  return (
    <DfaultLayout active={{ active: "login" }}>
      <Form formComponent={"login"} />
    </DfaultLayout>
  )
}

export default Login