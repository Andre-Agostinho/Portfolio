
// ********************************************************************
// componentes da pagina do Menu para os clientes


import React, { useEffect, useState } from 'react';

export default function Menu({ onSelectPlate}) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3010/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        setLoading(false);
      });
  }, []);

const categorizedMenu = menu.reduce((categories, plate) => {
  if (!categories[plate.category]) {
    categories[plate.category] = [];
  }
  categories[plate.category].push(plate);
  return categories;
}, {});

const sortedCategories = Object.keys(categorizedMenu).sort((a, b) => {
  const order = ["dessert", "main", "starters" ];
  return order.indexOf(a) - order.indexOf(b);
});

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <hr/>
      {Object.keys(categorizedMenu).length === 0 && <p>No plates found</p>}
       {Object.entries(categorizedMenu).map(([category, plates]) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
           {categorizedMenu[category].map((plate) => (
           <li key={plate.id}>
            <button
              onClick={() => onSelectPlate(plate)} id='btnActiveMenu'
              style={{
                border: "5px solid gray",
                padding: "10px",
                borderRadius: "15px",
                backgroundColor: "#f9f0e0",
              }}
            >
              <img
                src={plate.photoUrl}
                alt={plate.plateName}
                style={{ width: "200px", height: "200px" }}
              />
              <h3>{plate.plateName}</h3>
              <p>Price: €{plate.price}</p>
            </button>
          </li>
        ))}
      </ul>
      </div>
    ))}
  </section>
  );
}

