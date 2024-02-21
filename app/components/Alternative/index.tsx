import styles from "./style.module.css";

interface AlternativeProps {
  label: string;
  order: number;
  isCorect: boolean;
  isIncorect: boolean;
}

export function Alternative(props: AlternativeProps) {
  const id = `alternative-${props.order}`;

  return (
    <>
      <input
        tabIndex={-1}
        type="radio"
        id={id}
        name="alternative"
        defaultValue={props.order}
        className={props.isCorect ? styles.inputCorect : props.isIncorect ? styles.inputIncorect : styles.input}
      />
      <label htmlFor={id} className={styles.component} tabIndex={0}>
        {props.label}
      </label>
    </>
  );
}
