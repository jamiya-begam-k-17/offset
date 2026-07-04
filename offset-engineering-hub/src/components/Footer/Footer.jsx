import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>Offset</p>
          <p className={styles.tagline}>Analog-inspired innovation for India’s next national team.</p>
        </div>
        <div className={styles.links}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/articles">Articles</a>
        </div>
      </div>
      <p className={styles.copy}>© 2026 Offset. Made for a 22-member national team passionate about CPU, VLSI, semiconductors, and hackathon innovation.</p>
    </footer>
  );
}

export default Footer;
