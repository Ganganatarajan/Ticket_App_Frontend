import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import image from"../assets/img.webp"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 6;
  const canSubmit = emailValid && passwordValid;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate("/tickets");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
      <main className="grid place-items-center px-4 pb-16">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-xl md:grid-cols-2">
  <div
  className="
    relative hidden md:block
    min-h-[460px]
    bg-blue-300  
  "
  style={{
    backgroundImage: `linear-gradient(135deg, rgba(37,99,235,0.85), rgba(20,40,166,0.65)), url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundBlendMode: "overlay", 
  }}
  aria-hidden="true"
>
  <div className="relative z-10 p-8 text-white">
    <h2 className="text-3xl font-black tracking-tight drop-shadow">Ticket Hub</h2>
    <p className="mt-4 max-w-sm text-sm/6 opacity-95">
      Demo only. Use any email and a 6+ character password.
    </p>
  </div>
  <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
</div>
          <form onSubmit={onSubmit} className="p-8 md:p-10">
            <h3 className="mb-6 text-center text-2xl font-bold text-slate-900">Login (Mock)</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                {!emailValid && email.length > 0 && (
                  <p className="mt-1 text-xs text-red-600">Enter a valid email.</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 pr-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute inset-y-0 right-0 px-3 text-slate-500"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                   
                  </button>
                </div>
                {!passwordValid && password.length > 0 && (
                  <p className="mt-1 text-xs text-red-600">Password must be at least 6 characters.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 py-2 font-semibold text-white shadow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
