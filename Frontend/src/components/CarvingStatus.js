import React from "react";
import styles from "@/styles/statusData.module.css";

function CarvingStatus({
  item,
  handleEdit,
  week,
  searchTerm,
  notStarted,
  inProgress,
  completed,
  isConfirmed,
  notConfirmed,
  currentDate,
}) {
  if (
    (item.sid.toLowerCase() === searchTerm.toLowerCase() ||
      searchTerm === "" ||
      item.carving_by?.toLowerCase() === searchTerm.toLowerCase() ||
      searchTerm === "") &&
    (item.week === week || week === "Both") &&
    ((!item.carving_start && notStarted) ||
      (!item.carving_end && inProgress && item.carving_start) ||
      (item.carving_end && completed)) &&
    ((item.carving_confirmed && isConfirmed) ||
      (!item.carving_confirmed && notConfirmed))
  ) {
    return (
      <>
        <td className={styles.tableCell}>{item.sid}</td>
        {week === "Both" && <td className={styles.tableCell}>{item.week}</td>}
        <td className={styles.tableCell}>{item.stencils.title}</td>
        <td className={styles.tableCell}>
          <input
            type="datetime-local"
            value={item.carving_start || ""}
            style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "5px" }}
            onChange={(e) => handleEdit(item, "carving_start", e.target.value)}
          ></input>
          <div>
            <button
              className={styles.greenButton}
              onClick={() =>
                handleEdit(item, "carving_start", currentDate.toISOString())
              }
            >
              ✓
            </button>
            <button
              className={styles.redButton}
              onClick={() => handleEdit(item, "carving_start", null)}
            >
              X
            </button>
          </div>
        </td>
        <td className={styles.tableCell}>
          <input
            type="datetime-local"
            value={item.carving_end || ""}
            style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "5px" }}
            onChange={(e) => handleEdit(item, "carving_end", e.target.value)}
          ></input>
          <div>
            <button
              className={styles.greenButton}
              onClick={() =>
                handleEdit(item, "carving_end", currentDate.toISOString())
              }
            >
              ✓
            </button>
            <button
              className={styles.redButton}
              onClick={() => handleEdit(item, "carving_end", null)}
            >
              X
            </button>
          </div>
        </td>
        <td className={styles.tableCell}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(
                item,
                "carving_by",
                document.getElementById(`carving_by_${item.sid}_${item.index}`)
                  .value
              );
            }}
          >
            <input
              id={`carving_by_${item.sid}_${item.index}`}
              type="text"
              placeholder={"No Carver Assigned"}
              style={{ backgroundColor: "#282828", color: "#b0b0b0", border: "1px solid #333", borderRadius: "4px", padding: "5px" }}
              defaultValue={item.carving_by}
            />
            <div>
              <button type="submit" className={styles.greenButton}>
                Save
              </button>
              <button
                className={styles.redButton}
                onClick={() => {
                  handleEdit(item, "carving_by", null);
                  document.getElementById(
                    `carving_by_${item.sid}_${item.index}`
                  ).value = null;
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </td>
        <td className={styles.tableCell}>
          {item.carving_confirmed ? "Confirmed" : "Not Confirmed"}
          <div>
            <button
              className={styles.greenButton}
              onClick={() =>
                handleEdit(item, "carving_confirmed", currentDate.toISOString())
              }
            >
              Confirm
            </button>
            <button
              className={styles.redButton}
              onClick={() => handleEdit(item, "carving_confirmed", null)}
            >
              Unconfirm
            </button>
          </div>
        </td>
      </>
    );
  }
  return null;
}

export default CarvingStatus;