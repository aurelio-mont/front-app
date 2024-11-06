import NavBar from "../components/NavBar/NavBar"
import { DfaultLayoutProps } from "../types"
function DfaultLayout({ children, active }: DfaultLayoutProps) {

	return (
		<>
			<NavBar active={active.active} />
			<main>{children}</main>
		</>
	)
}
export default DfaultLayout