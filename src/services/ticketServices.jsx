import api from "./api";

export async function getTickets() {
  const { data } = await api.get("/tickets");
  return data;
}

export async function createTicket(payload) {
  const { data } = await api.post("/tickets", payload);
  return data;
}

export async function updateTicket(id, payload) {
  const { data } = await api.put(`/tickets/${id}`, payload);
  return data;
}
