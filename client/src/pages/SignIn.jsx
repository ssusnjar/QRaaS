import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/QRaaS.png";
import Scan from "../assets/scanCode.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        alert("Uspješna prijava!");
        navigate("/");
      } else {
        alert(data.message || "Neuspješna prijava.");
      }
    } catch (err) {
      console.error(err);
      alert("Došlo je do pogreške pri prijavi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-50 p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <span className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-stone-200" />

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-stone-100 flex items-center justify-center p-10">
            <img
              src={Scan}
              alt="Skeniraj QR kod"
              className="max-h-[420px] w-auto object-contain"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-10 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex justify-center mb-6">
                <img
                  src={Logo}
                  alt="QRaaS"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-6 text-center">
                Prijava
              </h2>

              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              <label className="sr-only" htmlFor="password">
                Lozinka
              </label>
              <input
                id="password"
                type="password"
                placeholder="Lozinka"
                className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-customOrange hover:bg-hoverOrange text-white py-3 rounded-full transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Prijava..." : "Prijavi se"}
              </button>

              <p className="mt-4 text-center text-sm text-stone-500">
                Nemaš račun?{" "}
                <Link
                  to="/register"
                  className="font-medium text-customOrange hover:text-hoverOrange underline underline-offset-2"
                >
                  Registriraj se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
