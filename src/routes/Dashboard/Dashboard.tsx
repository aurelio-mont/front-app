import { useAuthContext } from "../../context";
import DfaultLayout from "../../layout/DfaultLayout"

function Dashboard() {
  const { profile } = useAuthContext();
  return (
    <>
      <DfaultLayout active={{ active: "dashboard" }}>
        <h1>{profile.email}</h1>
      </DfaultLayout>
    </>
  )
}

export default Dashboard