import styles from "./styles.module.css";

interface ButtonPrimaryProps {
  text: string;
  click: VoidFunction;
}

export function ButtonPrimary(props: ButtonPrimaryProps) {
  return (
    <button onClick={props.click} className={styles.button}>
      {props.text}
    </button>
  );
}
