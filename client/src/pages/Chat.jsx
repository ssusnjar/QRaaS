import { useState } from "react";
import Header from "../components/Header";
import axios from  "axios"

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const loggedInUserId = user?.userId;
    const restaurantId = localStorage.getItem("restaurantId");


    if (!loggedInUserId || !restaurantId) {
      alert("Nedostaje user ID ili restaurant ID");
      return;
    }
    try {
      const res = await axios.post("/api/chat", {
        message: input,
        userId: loggedInUserId,
        restaurantId: restaurantId, 
      });

      setMessages((prev) => [
      ...prev,
      { from: "user", text: input },
      { from: "bot", text: res.data.reply },
    ]);

      setInput("");
    } catch (err) {
      console.error("Greška kod slanja:", err);
      alert("Došlo je do greške!");
    }
  };

  //   if (!input.trim()) return;

  //   const userMsg = { from: "user", text: input };
  //   setMessages((prev) => [...prev, userMsg]);
  //   setInput("");

  //   const res = await fetch("http://localhost:5000/api/chat", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ message: input }),
  //   });

  //   const data = await res.json();
  //   const botMsg = { from: "bot", text: data.reply };
  //   setMessages((prev) => [...prev, botMsg]);
  // };

return (
   <div className="max-w-[1240px] mx-auto mb-80" >
      <Header />
  <div className="max-w-2xl mx-auto pt-28 p-4">
    <h2 className="text-3xl font-bold mb-6 text-center">Chat</h2>

    <div className="h-80 overflow-y-scroll border border-gray-300 rounded-xl p-4 bg-white shadow-sm space-y-2 mb-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`px-4 py-2 rounded-xl max-w-[70%] ${
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

    <div className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Napiši poruku..."
        className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customOrange"
      />
      <button
        onClick={sendMessage}
        className="bg-customOrange hover:bg-hoverOrange text-white px-6 py-2 rounded-full"
      >
        Pošalji
      </button>
    </div>
  </div>
  </div>
);

}
