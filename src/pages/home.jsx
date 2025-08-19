import { NavLink } from "react-router-dom";

export default function Home() {

 return (
    <div className="relative bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-200 blur-3xl" />
      </div>
      <section className="min-h-[calc(100vh-4rem)] grid place-items-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
            Ticket Hub • Demo
          </span>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
            Manage your tickets with
            <span className="block bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              clarity and speed
            </span>
          </h1>

         <p className="mt-6 text-lg leading-8 text-slate-600">
  Streamline ticket management—log requests, set priorities, and track
  progress in one clean, responsive dashboard.
</p>


          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <NavLink
              to="/create"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110"
            >
              Create a Ticket
            </NavLink>
            <NavLink
              to="/tickets"
              className="rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm hover:bg-sky-50"
            >
              View Tickets
            </NavLink>
            <NavLink
              to="/login"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Mock Login
            </NavLink>
          </div>
        </div>
      </section>


    </div>
  );
}

function Feature({ title, desc, emoji }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow hover:shadow-md transition">

      <h3 className="mt-3 text-lg font-semibold text-slate-900">{title} <span>{emoji}</span></h3>
      <p className="mt-1 text-sm text-slate-600 truncate">{desc}</p>
    </div>
  );
}
