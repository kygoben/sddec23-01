import React from "react";
import styles from "@/styles/statusData.module.css";

function CuttingStatus({
  item,
  handleEdit,
  week,
  searchTerm,
  notStarted,
  completed,
}) {
  return (
    <>
      <td className={styles.tableCell}>{item.sid}</td>
      {week === "Both" && <td className={styles.tableCell}>{item.week}</td>}
      <td className={styles.tableCell}>{item.stencils.title}</td>
      <td className={styles.tableCell}>
        {item.cutting_confirmed ? "Complete" : "Incomplete"}
        <div>
          <button
            className={styles.greenButton}
            onClick={() => handleEdit(item, "cutting_confirmed", 1)}
          >
            Complete
          </button>
          <button
            className={styles.redButton}
            onClick={() => handleEdit(item, "cutting_confirmed", 0)}
          >
            Clear
          </button>
        </div>
      </td>
    </>
  );
}

export default CuttingStatus;
