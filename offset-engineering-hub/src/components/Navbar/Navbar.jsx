import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>Offset</h1>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
      </div>
    </nav>
  );
}

export default Navbar;