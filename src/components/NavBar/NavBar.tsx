import { Link, useNavigate } from "react-router-dom";
import { NavBarProps } from "../../types";
import { useAuthContext } from "../../context";
import { logoutFetch } from "../../api";

export default function NavBar({ active }: NavBarProps) {
    const goTo = useNavigate();
    const { isAuthenticated, accessToken, setIsAuthenticated, setProfile, setAccessToken } = useAuthContext();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await logoutFetch(accessToken, refreshToken!);
            if (response.status === 205) {
                localStorage.removeItem("refreshToken");
                setIsAuthenticated(false);
                setProfile({ email: '', full_name: '', id: '', date_of_birth: '' });
                setAccessToken('');
                goTo("/");
            }
            console.warn(response.statusText);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    APP
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${active === "login" ? "active" : ""}`}
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${active === "signup" ? "active" : ""}`}
                                    to="/signup"
                                >
                                    Registrarse
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (<li className="nav-item">
                            <Link
                                className={`nav-link ${active === "dashboard" ? "active" : ""}`}
                                to="/dashboard"
                            >
                                Panel
                            </Link>
                        </li>
                        )}

                        {
                            isAuthenticated && (
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={handleLogout}
                                    >
                                        Cerrar Sesión
                                    </button>
                                </li>
                            )
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
}
