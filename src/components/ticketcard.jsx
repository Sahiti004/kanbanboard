import React from "react";
import "../styles/ticketcard.css";

import toDoImg from "../assets/ToDo.svg";
import inProgressImg from "../assets/InProgress.svg";
import doneImg from "../assets/Done.svg";
import backlogImg from "../assets/Backlog.svg";

import highPriorityImg from "../assets/HighPriority.svg";
import lowPriorityImg from "../assets/LowPriority.svg";
import mediumPriorityImg from "../assets/MediumPriority.svg";
import noPriorityImg from "../assets/NoPriority.svg";
import urgentPriorityColor from "../assets/UrgentPriorityColour.svg";

const TicketCard = ({ ticket, grouping }) => {
  const priorityImages = {
    4: urgentPriorityColor,
    3: highPriorityImg,
    2: mediumPriorityImg,
    1: lowPriorityImg,
    0: noPriorityImg,
  };

  const statusImages = {
    "Todo": toDoImg,
    "In progress": inProgressImg,
    Done: doneImg,
    Backlog: backlogImg,
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id"  style={{ fontSize: "12px"}}>{ticket.id}</span>
        <img
          src={ticket.assignee_avatar || "https://via.placeholder.com/32"}
          alt={ticket.assignee || "Unassigned"}
          className="assignee-avatar"
        />
      </div>

      <div
        style={{
          display: "inline-flex",
          flexDirection: grouping === "status" ? "column" : "row",
          alignItems: "center",
        }}
      >
        {grouping === "priority" && (
          <div className="status-section" style={{ marginRight: "10px" }}>
            <img
              src={statusImages[ticket.status] || toDoImg}
              alt={ticket.status || "To-Do"}
              className="status-icon"
            />
          </div>
        )}

        <h4 className="ticket-title" style={{ fontSize: "12px", margin: "0" }}>
          {ticket.title}
        </h4>

        {/* Show priority icon below the title when grouping by status */}
        {grouping === "status" && (
          <div className="priority-section" >
            <img
              src={priorityImages[ticket.priority]}
              alt={`Priority ${ticket.priority}`}
              className="priority-icon"
            />
          </div>
        )}
      </div>

      <div className="ticket-footer">
        <span className="ticket-type">{ticket.tag[0] || "Feature Request"}</span>
      </div>
    </div>
  );
};

export default TicketCard;
