import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const userId = user?.userId;
    const restaurantId = localStorage.getItem("restaurantId") || undefined;

    if (!input.trim()) return;
    if (!userId) {
      alert("Nedostaje user ID (prijavi se).");
      return;
    }

    setMessages((prev) => [...prev, { from: "user", text: input }]);

    try {
      const res = await axios.post(
        "/api/chat",
        {
          text: input,
          restaurantId: localStorage.getItem("restaurantId") || undefined,
        },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
         const replyText =
        res?.data?.reply ||
        res?.data?.result?.summary ||
        "OK, ažurirano.";


      const rid = res?.data?.result?.restaurantId;
      if (rid) localStorage.setItem("restaurantId", rid);

   
      const cid = res?.data?.result?.cjenikId;
      if (cid) localStorage.setItem("cjenikId", cid);

      setMessages((prev) => [...prev, { from: "bot", text: replyText }]);
      setInput("");
    } catch (err) {
      console.error("Greška kod slanja:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Ups, došlo je do greške pri obradi poruke." },
      ]);
    }
  };

return (
  <div className="max-w-[1440px] mx-auto mb-20">
    <Header />
    <div className="max-w-4xl mx-auto pt-20 p-6">
      <div className="h-[600px] overflow-y-scroll border border-gray-300 rounded-2xl p-6 bg-white shadow-md space-y-4 mb-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-5 py-3 rounded-2xl max-w-[75%] ${
                msg.from === "user"
                  ? "bg-customOrange text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <span className="font-semibold block text-sm mb-1">
                {msg.from === "user" ? "Ti" : "Bot"}:
              </span>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Napiši poruku..."
          className="flex-grow border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-customOrange"
        />
        <button
          onClick={sendMessage}
          className="bg-customOrange hover:bg-hoverOrange text-white px-8 py-3 rounded-full"
        >
          Pošalji
        </button>
      </div>
    </div>
  </div>
);

}
