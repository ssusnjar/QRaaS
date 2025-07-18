import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UrediCjenik() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cjenik, setCjenik] = useState(null);

  useEffect(() => {
    const fetchCjenik = async () => {
      const res = await fetch(`/api/cjenici/${id}`);
      const data = await res.json();
      if (res.ok) setCjenik(data);
    };
    fetchCjenik();
  }, [id]);

  const handleSave = async () => {
    const res = await fetch(`/api/cjenici/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cjenik),
    });

    if (res.ok) {
      alert("Cjenik ažuriran!");
      navigate(`/cjenik/${id}`);
    }
  };

  const addSection = () => {
    const newSections = [
      ...cjenik.sections,
      { title: "Nova sekcija", items: [] },
    ];
    setCjenik({ ...cjenik, sections: newSections });
  };

  const removeSection = (sectionIndex) => {
    const newSections = cjenik.sections.filter((_, i) => i !== sectionIndex);
    setCjenik({ ...cjenik, sections: newSections });
  };

  const addItem = (sectionIndex) => {
    const newSections = [...cjenik.sections];
    newSections[sectionIndex].items.push({ name: "Nova stavka", price: "" });
    setCjenik({ ...cjenik, sections: newSections });
  };

  const removeItem = (sectionIndex, itemIndex) => {
    const newSections = [...cjenik.sections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter(
      (_, j) => j !== itemIndex
    );
    setCjenik({ ...cjenik, sections: newSections });
  };

  if (!cjenik) return <div>Učitavanje...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Uredi cjenik</h1>

      <input
        className="border w-full p-2 mb-4"
        value={cjenik.name}
        onChange={(e) => setCjenik({ ...cjenik, name: e.target.value })}
      />

      {cjenik.sections.map((section, i) => (
        <div key={i} className="mb-6 border border-gray-200 rounded p-4">
          <div className="flex justify-between items-center mb-2">
            <input
              className="border p-2 w-full mr-2"
              value={section.title}
              onChange={(e) => {
                const newSections = [...cjenik.sections];
                newSections[i].title = e.target.value;
                setCjenik({ ...cjenik, sections: newSections });
              }}
            />
            <button
              onClick={() => removeSection(i)}
              className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-50"
            >
              X
            </button>
          </div>

          {section.items.map((item, j) => (
            <div key={j} className="flex gap-2 mb-2">
              <input
                className="border p-2 w-full"
                value={item.name}
                placeholder="Naziv"
                onChange={(e) => {
                  const newSections = [...cjenik.sections];
                  newSections[i].items[j].name = e.target.value;
                  setCjenik({ ...cjenik, sections: newSections });
                }}
              />
              <input
                className="border p-2 w-24"
                value={item.price}
                placeholder="Cijena"
                onChange={(e) => {
                  const newSections = [...cjenik.sections];
                  newSections[i].items[j].price = e.target.value;
                  setCjenik({ ...cjenik, sections: newSections });
                }}
              />
              <button
                onClick={() => removeItem(i, j)}
                className="text-red-500 border border-red-500 px-2 rounded hover:bg-red-50"
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={() => addItem(i)}
            className="border border-black text-black px-3 py-1 rounded hover:bg-gray-100 mt-2"
          >
            + Dodaj stavku
          </button>
        </div>
      ))}

      <button
        onClick={addSection}
        className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100 mb-6"
      >
        + Dodaj sekciju
      </button>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-customOrange hover:bg-hoverOrange text-white px-6 py-3 rounded-full transition"
        >
          Spremi promjene
        </button>
        <button
          onClick={() => navigate(-1)}
          className="border border-black text-black px-6 py-3 rounded-full transition"
        >
          Odustani
        </button>
      </div>
    </div>
  );
}
