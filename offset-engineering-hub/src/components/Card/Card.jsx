import styles from "./Card.module.scss";

function Card({ title, description, category, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      {category && <span className={styles.category}>{category}</span>}
    </div>
  );
}

export default Card;