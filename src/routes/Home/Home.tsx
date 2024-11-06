import { Navigate } from "react-router-dom";
import DfaultLayout from "../../layout/DfaultLayout"
import { useAuthContext } from "../../context";


function Home() {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }
  return (
    <>
      <DfaultLayout active={{ active: "home" }}>
        <h1>Home</h1>
      </DfaultLayout>
    </>
  )
}

export default Home