import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import styles from "./Login.module.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await authService.login(username, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h1>Contributor Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}

export default Login;