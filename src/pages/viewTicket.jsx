import { useMemo, useState } from "react";
import { useTickets } from "../context/ticketCotext";

const statusOrder = ["Open", "In Progress", "Closed"];
const nextStatus = (s) => statusOrder[(statusOrder.indexOf(s) + 1) % statusOrder.length];

export default function ViewTickets() {
  const { tickets, loading, error, updateTicket } = useTickets();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return tickets
      .filter((t) =>
        q ? (t.title + " " + t.description).toLowerCase().includes(q.toLowerCase()) : true
      )
      .filter((t) => (status === "All" ? true : t.status === status));
  }, [tickets, q, status]);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Tickets</h2>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tickets…"
                className="w-64 min-w-0 bg-transparent outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex overflow-hidden rounded-xl border border-blue-200 bg-white text-sm">
              {["All", "Open", "In Progress", "Closed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-2 transition ${
                    status === s ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-sky-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        {loading && <SkeletonList />}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((t) => (
                  <TicketCard key={t._id} t={t} onAdvance={() =>
                    updateTicket(t._id, { ...t, status: nextStatus(t.status) })
                  } />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
function TicketCard({ t, onAdvance }) {
  const tone =
    t.status === "Closed" ? "green" : t.status === "In Progress" ? "amber" : "gray";

  return (
    <article className="group rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="pointer-events-none absolute inset-x-0 h-1 -mt-5 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 transition group-hover:opacity-100" />
      <h3 className="text-lg font-semibold text-slate-900">{t.title}</h3>
      <p className="mt-1 line-clamp-3 text-sm text-slate-700">{t.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <Badge tone="blue">Priority: {t.priority}</Badge>
        <Badge tone={tone}>Status: {t.status}</Badge>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onAdvance}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-3 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
        >
          Set {nextLabel(t.status)}
        </button>
      </div>
    </article>
  );
}

function Badge({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    blue: "bg-sky-50 text-blue-700 border-blue-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    green: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

function nextLabel(s) {
  const order = ["Open", "In Progress", "Closed"];
  const idx = (order.indexOf(s) + 1) % order.length;
  return order[idx];
}

function SkeletonList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="h-5 w-1/2 rounded bg-slate-200" />
          <div className="mt-3 h-3 w-5/6 rounded bg-slate-200" />
          <div className="mt-2 h-3 w-4/6 rounded bg-slate-200" />
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-24 rounded-full bg-slate-200" />
            <div className="h-6 w-28 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-3xl border border-blue-100 bg-white px-8 py-16 text-center shadow">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-2xl">🗒️</div>
      <h4 className="mt-4 text-lg font-semibold text-slate-900">No tickets yet</h4>
      <p className="mt-1 text-sm text-slate-600">Create your first ticket to get started.</p>
    </div>
  );
}
