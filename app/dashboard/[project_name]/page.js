import styles from "./page.module.scss";

export default function DashboardProjectPage({ params }) {
  return (
    <div className={styles.dashboardContainer}>
      <h1>Bienvenue sur votre projet {params.project_name} !</h1>
      <p>Contenu du Dashboard...</p>
    </div>
  );
}
