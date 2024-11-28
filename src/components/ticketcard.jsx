import React from "react";
import "../styles/ticketcard.css";

import highPriorityImg from "../assets/HighPriority.svg";
import lowPriorityImg from "../assets/LowPriority.svg";
import mediumPriorityImg from "../assets/MediumPriority.svg";
import noPriorityImg from "../assets/NoPriority.svg";
import urgentPriorityColor from "../assets/UrgentPriorityColour.svg";

const TicketCard = ({ ticket }) => {
  const priorityImages = {
    4: urgentPriorityColor,
    3: highPriorityImg,
    2: mediumPriorityImg,
    1: lowPriorityImg,
    0: noPriorityImg,
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <img
          src={ticket.assignee_avatar || "https://via.placeholder.com/32"}
          alt={ticket.assignee || "Unassigned"}
          className="assignee-avatar"
        />
      </div>
      <h4 className="ticket-title">{ticket.title}</h4>
      <div className="ticket-footer">
        <img
          src={priorityImages[ticket.priority]}
          alt={`Priority ${ticket.priority}`}
          className="priority-icon"
        />
        <span className="ticket-type">{ticket.type || "Task"}</span>
      </div>
    </div>
  );
};

export default TicketCard;
