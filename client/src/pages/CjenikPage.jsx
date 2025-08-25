import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CjenikPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cjenik, setCjenik] = useState(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const fetchCjenik = async () => {
      const res = await fetch(`/api/cjenici/${id}`);
      const data = await res.json();
      setCjenik(data);
    };
    fetchCjenik();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Jesi siguran da želiš obrisati ovaj cjenik?")) {
      await fetch(`/api/cjenici/${id}`, { method: "DELETE" });
      navigate("/");
    }
  };

  if (!cjenik) return <div>Učitavanje...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
     <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">{cjenik.name}</h2>

      {cjenik.sections.map((section, i) => (
        <div key={i} className="mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-2">{section.title}</h3>

          <ul>
            {section.items.map((item, j) => (
              <li
                key={j}
                className="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50 transition mb-2"
              >
                <span>{item.name}</span>
                <span className="font-semibold text-customOrange">{item.price} €</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="text-center my-8">
        <button
          onClick={() => setShowQR(!showQR)}
          className="bg-customOrange hover:bg-hoverOrange text-white px-6 py-3 rounded-full transition"
        >
          {showQR ? "Sakrij QR kod" : "Podijeli (QR kod)"}
        </button>
        {showQR && (
          <div className="mt-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location.href}&size=200x200`}
              alt="QR kod"
              className="mx-auto"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => navigate(`/uredi-cjenik/${id}`)}
          className="bg-customOrange hover:bg-hoverOrange text-white px-6 py-3 rounded-full transition"
        >
          Uredi
        </button>

        <button
          onClick={handleDelete}
          className="bg-white border border-black text-black px-6 py-3 rounded-full transition hover:bg-gray-100"
        >
          Izbriši
        </button>
      </div>
    </div>
  );
}
