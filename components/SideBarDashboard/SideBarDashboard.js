import Image from "next/image";
import Link from "next/link";

import styles from "./SideBarDashboard.module.scss";

const SideBarDashboard = () => {
  return (
    <aside className={styles.sideBarDashboard}>
      <div className={styles.top}>
        <Image
          src="/images/exemple.png"
          alt="exemple"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.content}>
        <ul>
          <li>
            <Link href="#mes_projets">Mes projets</Link>
          </li>
          <ul>
            <li>
              <Link href="#nom_du_projet">Nom du projet</Link>
            </li>
            <ul>
              <li>
                <Link href="#taches">Tâches</Link>
              </li>
              <li>
                <Link href="#notifications">Notifications</Link>
              </li>
              <li>
                <Link href="#equipe">Equipe</Link>
              </li>
              <li>
                <Link href="#documents">Documents</Link>
              </li>
            </ul>
          </ul>
        </ul>
      </div>
      <div className={styles.bottom}>
        <Link href="#support">Support</Link>
        <Link href="#settings">Settings</Link>
      </div>
    </aside>
  );
};

export default SideBarDashboard;
