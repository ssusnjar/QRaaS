import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function MenusList({ userId }) {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch(`/api/cjenici/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setMenus(data);
        }
      } catch (err) {
        console.error("Greška kod dohvaćanja menija:", err);
      }
    };

    if (userId) {
      fetchMenus();
    }
  }, [userId]);

  if (!menus.length) {
    return <div className="px-4 py-2 text-gray-400">Nema jelovnika</div>;
  }

  return (
    <ul>
      {menus.map((menu) => (
        <li
          key={menu._id}
          onClick={() => navigate(`/cjenik/${menu._id}`)}
          className="px-4 py-1 text-sm hover:bg-gray-100 cursor-pointer"
        >
          {menu.name}
        </li>
      ))}
    </ul>
  );
}
