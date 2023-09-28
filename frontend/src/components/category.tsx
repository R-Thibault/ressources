import { CategoryProps } from "./adCard";
import styles from "../styles/Header.module.css";

export default function Category(props: CategoryProps): React.ReactNode {
  return (
    <a
      href={`/category/${props.id}/ads`}
      className={styles.categoryNavigationLink}
    >
      {props.title}
    </a>
  );
}
