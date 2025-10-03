import React from "react";
import styles from "./css/confirm.module.css";
import { LanguageContext } from "../../contexts/LanguageContext";
import { CgUndo } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type ConfirmProps = {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Confirm: React.FC<ConfirmProps> = ({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  const { t } = React.useContext(LanguageContext)!;
  return (
    <section id={styles.confirm} className={styles.confirm}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button className={styles["confirm-btn"]} onClick={onConfirm}>
            {confirmText ? confirmText : t("Confirm")}&nbsp;&nbsp;
            <IoMdCheckmarkCircleOutline />
          </button>
          <button className={styles["cancel-btn"]} onClick={onCancel}>
            {cancelText ? cancelText : t("Cancel")}&nbsp;&nbsp;
            <CgUndo />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Confirm;
