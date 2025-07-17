import React from "react";
import cellStyles from "../styles/Cell.module.css";
import mineFStyles from "../styles/MineF.module.css";


const Cell = ({ cell }) => {
    let className = cellStyles.cell;

    if (cell.state === "covered") className += ` ${cellStyles.covered}`;
    else if (cell.state === "revealed") className += ` ${cellStyles.revealed}`;
    else if (cell.state === "flagged") className += ` ${cellStyles.flagged}`;
    else if (cell.state === "player") className += ` ${cellStyles.player}`;
    else className += ` ${cellStyles.unknown}`;

    if (cell.type === "mine") {

        className += ` ${mineFStyles.mineF}`;
        if (cell.state === "covered") className += ` ${mineFStyles.covered}`;
        else if (cell.state === "flagged") className += ` ${mineFStyles.flagged}`;
        else if (cell.state === "revealed") className += ` ${mineFStyles.revealed}`;
    }

    let display = cell.content;

    return <div className={className}>{display}</div>;
};


export default Cell;
