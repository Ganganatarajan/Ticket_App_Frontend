import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as ticketApi from "../services/ticketServices";

const TicketCtx = createContext(null);

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const list = await ticketApi.getTickets();
      setTickets(list);
      setError("");
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function createTicket(ticket) {
    const created = await ticketApi.createTicket(ticket);
    setTickets((t) => [created, ...t]);
    return created;
  }

  async function updateTicket(id, next) {
    const updated = await ticketApi.updateTicket(id, next);
    setTickets((arr) => arr.map((t) => (t._id === id ? updated : t)));
    return updated;
  }

  const value = { tickets, loading, error, refresh, createTicket, updateTicket };
  return <TicketCtx.Provider value={value}>{children}</TicketCtx.Provider>;
}

export const useTickets = () => useContext(TicketCtx);
