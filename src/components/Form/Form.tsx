import { useEffect, useState } from "react";
import { FormProps, User } from "../../types";
import { useNavigate } from "react-router-dom";
import { loginFetch, signupFetch } from "../../api";
import { useAuthContext } from "../../context";

export default function Form({ formComponent }: FormProps) {
  const { setIsAuthenticated, setProfile, setAccessToken } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const goTo = useNavigate();
  const activateSession = (user: User, accessToken: string, refreshToken: string) => {
    setProfile(user);
    setAccessToken(accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
    resetForm();
  }
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsValid(false);
    setError("");
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formComponent === "login") {
      try {
        const response = await loginFetch({ email, password });
        const data = await response.json();
        if (response.ok) {
          activateSession(data.user, data.tokens.access, data.tokens.refresh);
          goTo("/");
        }
        setError(data.message)
      } catch (error) {
        setError("Hubo un error al iniciar sesión");
        console.error(error);
      }
    }

    if (formComponent === "signup") {
      try {
        const response = await signupFetch({ email, password });
        const data = await response.json();
        if (response.ok) {
          activateSession(data.user, data.tokens.access, data.tokens.refresh);
          goTo("/");
        }
        setError(data.message)
      } catch (error) {
        setError("Hubo un error al registrar");
        console.error(error);
      }
    }
  }

  useEffect(() => {
    setError("");
    if (formComponent === "login") {
      if (email && password) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      if (email && password && confirmPassword && password === confirmPassword) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [email, password, confirmPassword, isValid, formComponent])
  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>ERROR!</strong> {error}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>}
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="card w-50 mx-auto">
              <div className="card-header">
                {formComponent === "login" ? "Iniciar sesión" : "Registrarse"}
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    Nunca compartiremos su correo electrónico con nadie más.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {formComponent === "signup" && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
                <button type="submit" className="btn btn-primary" disabled={!isValid}>
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
