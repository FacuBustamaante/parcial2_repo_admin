import styles from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

export default function Modal({ children, onClose, title }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {children}
          <button onClick={onClose} className={styles.cancelButton}>
          Cancelar
        </button>
        </div>

        
      </div>
    </div>
  );
}