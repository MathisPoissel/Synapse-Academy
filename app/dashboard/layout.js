import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SideBarDashboard from "../../components/SideBarDashboard/SideBarDashboard";
import styles from "./layout.module.scss";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardLayout}>
      <SideBarDashboard />
      <div className={styles.dashboardContent}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
