"use client";

import styles from "../../props-manager.module.css";

export const UnknownSection = () => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Unknown Block Type</h3>
      <p className={styles.placeholderText}>
        This block type is not supported in the inspector.
      </p>
    </div>
  );
};
