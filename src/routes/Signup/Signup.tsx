import { Navigate } from "react-router-dom";
import Form from "../../components/Form"
import DfaultLayout from "../../layout/DfaultLayout"
import { useAuthContext } from "../../context";

function Signup() {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }
  return (
    <>
      <DfaultLayout active={{ active: "signup" }}>
        <Form formComponent={"signup"} />
      </DfaultLayout>
    </>
  )
}

export default Signup