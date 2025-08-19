import { useState } from "react";
import { useTickets } from "../context/ticketCotext";

export default function CreateTicket() {
  const { createTicket } = useTickets();
  const [form, setForm] = useState({ title: "", description: "", priority: "Low" });
  const [msg, setMsg] = useState(null);
  const MAX_DESC = 500;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket(form);
      setForm({ title: "", description: "", priority: "Low" });
      setMsg({ type: "ok", text: "Ticket created Successfully" });
    } catch {
      setMsg({ type: "err", text: "Failed to create ticket" });
    }
  };

  const PriorityPill = ({ value }) => {
    const active = form.priority === value;
    return (
      <button
        type="button"
        onClick={() => setForm((f) => ({ ...f, priority: value }))}
        className={`rounded-full border px-3 py-1.5 text-sm transition ${
          active
            ? "border-blue-300 bg-blue-50 text-blue-700"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <form onSubmit={onSubmit} className="mx-auto max-w-4xl">
        <header className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Create Ticket</h2>
          <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700">
            New
          </span>
        </header>

        <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Short summary"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Priority</label>
              <div className="flex flex-wrap gap-2">
        <PriorityPill value="Low" />
                <PriorityPill value="Medium" />
                <PriorityPill value="High" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={MAX_DESC}
              placeholder="Describe the issue…"
              className="h-56 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
            />
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-slate-500">{form.description.length}/{MAX_DESC}</span>
              <span className="text-slate-400">Markdown supported soon</span>
            </div>
          </div>
          <div className="mt-5 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <span className="text-xs text-slate-500">Tip: keep titles short & clear.</span>
            <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 font-semibold text-white shadow hover:brightness-110 sm:w-auto">
              Create
            </button>
          </div>
          {msg && (
            <div
     className={`mt-4 rounded-xl border px-3 py-2 text-sm ${
                msg.type === "ok"
             ? "border-green-200 bg-green-50 text-green-700"
         : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {msg.text}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
