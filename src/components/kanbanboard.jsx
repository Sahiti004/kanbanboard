import React, { useState, useEffect } from "react";
import TicketCard from "./ticketcard";
import "../styles/kanbanboard.css";
import { API_URL } from "../api";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchData();
  }, []);

  const groupTickets = () => {
    switch (grouping) {
      case "status":
        return groupBy("status");
      case "user":
        return groupBy("assignee");
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

  return (
    <div className="kanban-container">
      <div className="kanban-controls">
        <div>
          <label>Group By: </label>
          <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div>
          <label>Sort By: </label>
          <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div className="kanban-board">
        {groupedTickets.map(({ group, tickets }) => (
          <div key={group} className="kanban-column">
            <h3>{group}</h3>
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
