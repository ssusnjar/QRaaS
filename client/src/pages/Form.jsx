import { useState,useEffect } from "react";
import Header from "../components/Header";

export default function FormPage() {
  const [sections, setSections] = useState([
    { title: "Topla pića", items: [{ name: "", price: "" }] },
  ]);

  const [user, setUser] = useState(null);
  const [menuName, setMenuName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleAddSection = () => {
    setSections([...sections, { title: "", items: [{ name: "", price: "" }] }]);
  };

  const handleSectionTitleChange = (index, newTitle) => {
    const updated = [...sections];
    updated[index].title = newTitle;
    setSections(updated);
  };

  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    const updated = [...sections];
    updated[sectionIndex].items[itemIndex][field] = value;
    setSections(updated);
  };

  const handleAddItem = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].items.push({ name: "", price: "" });
    setSections(updated);
  };

const handleSubmit = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Morate biti prijavljeni da biste spremili jelovnik.");
    return;
  }

  try {
    const res = await fetch("/api/restaurants/with-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        name: menuName,   
        sections: sections,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Restoran i jelovnik uspješno spremljeni!");
      localStorage.setItem("restaurantId", data.restaurant._id);
    } else {
      alert(data.message || "Greška pri spremanju");
    }
  } catch (error) {
    console.error(error);
    alert("Greška!");
  }
};




  return (
     <div className="max-w-[1240px] mx-auto" >
      <Header />
    <div className="p-6 max-w-4xl mx-auto pt-28">
      <h1 className="text-3xl font-bold mb-8 text-center">Kreiraj Jelovnik</h1>
      <input
        type="text"
        value={menuName}
        onChange={(e) => setMenuName(e.target.value)}
        placeholder="Naziv"
        className="w-full mb-8 p-3 border-b-2 border-gray-300 focus:outline-none focus:border-customOrange text-xl font-semibold"
      />
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="bg-white p-6 rounded-xl shadow-md mb-6 hover:bg-stone-50"
        >
          <input
            type="text"
            value={section.title}
            onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
            placeholder="Unesi naziv odjeljka (npr. Hladna pića)"
            className="w-full text-xl font-semibold mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-customOrange"
          />

          {section.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center gap-4 mb-3">
              <input
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(sectionIndex, itemIndex, "name", e.target.value)
                }
                placeholder="Naziv artikla (npr. Kava)"
                className="flex-1 border p-2 rounded-md"
              />
              <input
                type="text"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(sectionIndex, itemIndex, "price", e.target.value)
                }
                placeholder="Cijena (npr. 2.50€)"
                className="w-28 border p-2 rounded-md"
              />
            </div>
          ))}

          <button
            onClick={() => handleAddItem(sectionIndex)}
            className="mt-2 text-sm text-customOrange hover:underline"
          >
            + Dodaj artikl
          </button>
        </div>
      ))}

   <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={handleAddSection}
        className="bg-customOrange hover:bg-hoverOrange text-white px-6 py-3 rounded-full transition"
      >
        + Dodaj odjeljak
      </button>

      <button  onClick={handleSubmit} class="w-40 bg-white hover:bg-stone-100 text-black border border-gray-500 py-3 rounded-full">
        💾 Spremi jelovnik
      </button>
    </div>

        
        </div>
      </div>
  );
}
