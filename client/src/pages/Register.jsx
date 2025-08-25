import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/QRaaS.png";
import Scan from "../assets/scanCode.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registracija uspješna! Prijavite se.");
        navigate("/login");
      } else {
        alert(data.message || "Greška pri registraciji");
      }
    } catch (err) {
      console.error(err);
      alert("Došlo je do pogreške.");
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
              alt="Registracija QR"
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
                Registracija
              </h2>

              <input
                type="text"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200"
                placeholder="Ime"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Lozinka"
                className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-customOrange hover:bg-hoverOrange text-white py-3 rounded-full transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Registracija..." : "Registriraj se"}
              </button>

              <p className="mt-4 text-center text-sm text-stone-500">
                Već imaš račun?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-customOrange hover:text-hoverOrange underline underline-offset-2"
                >
                  Prijavi se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
