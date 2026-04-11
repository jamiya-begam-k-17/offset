import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1>Welcome to Offset</h1>
        <p>
          Offset is a modern engineering storytelling platform that explains complex topics in space, electronics, and computing in an interesting way.
        </p>
        <button className={styles.button} onClick={() => navigate("/articles")}>
          Explore Articles
        </button>
      </div>
    </div>
  );
}

export default Home;