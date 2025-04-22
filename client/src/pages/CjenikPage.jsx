import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CjenikPage() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/cjenici/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Dobiveni podaci:", data);
        setItems(data.items || []);
      });
  }, [id]);

  return (
    <div>
      <h2>Cjenik 34</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item.naziv} - {item.cijena}
          </li>
        ))}
      </ul>
    </div>
  );
}
