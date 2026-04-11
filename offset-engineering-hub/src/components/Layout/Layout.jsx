import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.scss";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}

export default Layout;