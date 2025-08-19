import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-sky-100/80 bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-3xl font-black tracking-tight text-slate-900">
            Ticket <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Hub</span>
          </span>
        </NavLink>

        <nav className="hidden gap-1 md:flex">
          <NavItem to="/login">Login</NavItem>
          <NavItem to="/create">Create</NavItem>
          <NavItem to="/tickets">Tickets</NavItem>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-100 bg-white text-slate-700 shadow-sm md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-3 mb-3 rounded-2xl border text-xl border-sky-100 bg-white p-2 shadow-lg">
            <NavItem to="/login" full onNavigate={() => setOpen(false)}>Login</NavItem>
            <NavItem to="/create" full onNavigate={() => setOpen(false)}>Create</NavItem>
            <NavItem to="/tickets" full onNavigate={() => setOpen(false)}>Tickets</NavItem>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, children, onNavigate, full }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "rounded-full px-4 py-2 text-sm font-medium transition",
          full ? "block text-center" : "",
          isActive
            ? "text-white bg-gradient-to-r from-blue-600 to-sky-500 shadow"
            : "text-slate-700 hover:text-blue-700 hover:bg-sky-50",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
