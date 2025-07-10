import React from "react";
import styles from "../styles/Cell.module.css";

const Cell = ({ cell }) => {
    const { state, content } = cell;

    const renderContent = () => {
        if (state !== "discovered") return ""; // 👈 No mostrar nada si está cubierta

        const stringContent = String(content);
        if (stringContent.startsWith("P")) return stringContent;
        if (stringContent === "ME") return "💣";
        if (stringContent === "0") return "o";
        return stringContent;
    };

    return (
        <div className={styles.cell}>
            {renderContent()}
        </div>
    );
};

export default Cell;
