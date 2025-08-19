import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import Login from "./pages/login";
import CreateTicket from "./pages/createTicket";
import ViewTickets from "./pages/viewTicket";
import Home from "./pages/home";
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateTicket />} />
          <Route path="/tickets" element={<ViewTickets />} />
        </Routes>
      </main>
    </div>
  );
}
