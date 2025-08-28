import styles from "./footer.module.css";
export const Footer = ({ completedTask }) => {


  if (completedTask) {
    return (
      <footer>
        <code className={styles.footer}>
          Avec taskFlow tu as éliminé {completedTask} tache"s"
        </code>
      </footer>
    );
  }

  return null;
};
