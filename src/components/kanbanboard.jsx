import React, { useState, useEffect } from "react";
import TicketCard from "./ticketcard";
import "../styles/kanbanboard.css";
import { API_URL } from "../api";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sortOption, setSortOption] = useState("priority");
  const [displayMenu, setDisplayMenu] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchData();
  }, []);

  const userLookup = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const groupTickets = () => {
    switch (grouping) {
      case "status":
        return groupBy("status");
      case "user":
        return groupBy("userId");
      case "priority":
        return groupBy("priority");
      default:
        return [];
    }
  };

  const groupBy = (key) => {
    return tickets.reduce((acc, ticket) => {
      const group = ticket[key] || "Unassigned";
      acc[group] = acc[group] || [];
      acc[group].push(ticket);
      return acc;
    }, {});
  };

  const sortTickets = (groupedTickets) => {
    return Object.entries(groupedTickets).map(([group, tickets]) => {
      const sortedTickets = [...tickets].sort((a, b) => {
        if (sortOption === "priority") return b.priority - a.priority;
        if (sortOption === "title") return a.title.localeCompare(b.title);
        return 0;
      });
      return { group, tickets: sortedTickets };
    });
  };

  const groupedTickets = sortTickets(groupTickets());

  const handleDisplayChange = (type, value) => {
    if (type === "grouping") setGrouping(value);
    else if (type === "sorting") setSortOption(value);
    setDisplayMenu(false);
  };

  const priorityLabels = {
    4: { label: "Urgent", icon: require("../assets/UrgentPriorityColour.svg") },
    3: { label: "High Priority", icon: require("../assets/HighPriority.svg") },
    2: { label: "Medium Priority", icon: require("../assets/MediumPriority.svg") },
    1: { label: "Low Priority", icon: require("../assets/LowPriority.svg") },
    0: { label: "No Priority", icon: require("../assets/NoPriority.svg") },
  };

  return (
    <div className="kanban-container">
      <div className="kanban-controls">
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            Display
          </button>
          {displayMenu && (
            <div className="dropdown-menu">
              <div>
                <span>Grouping</span>
                <select
                  onChange={(e) =>
                    handleDisplayChange("grouping", e.target.value)
                  }
                  value={grouping}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div>
                <span>Ordering</span>
                <select
                  onChange={(e) =>
                    handleDisplayChange("sorting", e.target.value)
                  }
                  value={sortOption}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="kanban-board">
        {groupedTickets.map(({ group, tickets }) => {
          const priorityLabel = priorityLabels[group];
          return (
            <div key={group} className="kanban-column">
              {grouping === "priority" && priorityLabel ? (
                <div
                  className="priority-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  {/* <img
                    // src={priorityLabel.icon}
                    alt={priorityLabel.label}
                    className="priority-icon-header"
                    style={{ marginRight: "5px" }}
                  /> */}
                  <h3>{priorityLabel.label}</h3>
                </div>
              ) : (
                <h3>{grouping === "user" ? userLookup[group] : group}</h3>
              )}
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} grouping={grouping} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
