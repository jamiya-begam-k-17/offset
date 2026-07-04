import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.overline}>Engineering Collective</p>
          <h1>Crafting the future of hardware, analog, and silicon innovation.</h1>
          <p>
            Offset is the home for India’s national team of 22 creators building next-gen CPU, VLSI, and semiconductor stories. We create elegant project blogs, prototype solutions, and hackathon-ready ideas for the real world.
          </p>
          <div className={styles.actions}>
            <button onClick={() => navigate("/articles")}>Explore Articles</button>
            <button className={styles.secondary} onClick={() => navigate("/about")}>
              Meet the Team
            </button>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <div className={styles.panelCard}>
            <span>Featured</span>
            <h2>Analog design meets storytelling</h2>
            <p>Showcase your projects, share papers, and launch ideas that connect hardware with community.</p>
          </div>
          <div className={styles.panelGrid}>
            <div className={styles.metric}>
              <strong>22</strong>
              <span>team members</span>
            </div>
            <div className={styles.metric}>
              <strong>12</strong>
              <span>hackathons</span>
            </div>
            <div className={styles.metric}>
              <strong>65+</strong>
              <span>blog posts</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;