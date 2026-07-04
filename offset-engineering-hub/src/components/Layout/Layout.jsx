import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;