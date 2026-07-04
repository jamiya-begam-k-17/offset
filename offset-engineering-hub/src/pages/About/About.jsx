import styles from "./About.module.scss";

function About() {
  return (
    <div className={styles.about}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.overline}>National Team</p>
          <h1>22 innovators building India’s next hardware-first future.</h1>
          <p>
            We are a team of 22 members united by CPUs, VLSI, semiconductors, and analog systems. Our mission is to build elegant engineering solutions, compete in hackathons, and publish stories that inspire the next wave of makers.
          </p>
        </div>
        <div className={styles.panel}>
          <div className={styles.metric}>
            <span className={styles.value}>22</span>
            <span className={styles.label}>Team members</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.value}>170+</span>
            <span className={styles.label}>Hackathon hours</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.value}>40+</span>
            <span className={styles.label}>Ideas shared</span>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.card}>
          <h2>Why hardware?</h2>
          <p>
            We believe the future of technology is rooted in silicon design, systems engineering, and analog innovation. Our blog shares deep dives into CPU architecture, mixed-signal design, and emerging semiconductor trends.
          </p>
        </div>
        <div className={styles.card}>
          <h2>What we build</h2>
          <p>
            From prototype boards to system-level solutions, our projects blend practical engineering with storytelling. Every article and product idea is crafted to be beautiful, functional, and ready for real-world impact.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
