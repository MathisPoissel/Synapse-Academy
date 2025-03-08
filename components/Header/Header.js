import Link from "next/link";
import Image from "next/image";

import HeaderWrapper from "../HeaderWrapper/HeaderWrapper";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <HeaderWrapper scrollThreshold={300} ease="easeInOut" duration={0.55}>
      <div className={styles.headerContainer}>
        <p>Logo</p>
        <UserProfileIcon />
        <nav>
          <ul>
            <li className={styles.headerLink}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.headerLink}>
              <Link href="/login">Login</Link>
            </li>
            <li className={styles.headerLink}>
              <Link href="/match">Match</Link>
            </li>
          </ul>
        </nav>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
