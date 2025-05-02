
// paginas com a ementa, para o cliente realizar o pedido para a cozinha

import React, { useRef, useState } from "react";
import { updatePlates } from "../clients";
import Menu from "../components/ActiveMenu";
import '../assets/Index.css';
import { Link } from "react-router-dom";

function IndexMenu() {
  const selectedPlate = useRef(null);
  const [userPlates, setUserPlates] = useState([]);

  // Handle toggling a plate in the order
  function handleSelectPlate(selectedPlate) {
    setUserPlates((prevPlates) => {
      const isPlateSelected = prevPlates.some(
        (plate) => plate.id === selectedPlate.id
      );

      if (isPlateSelected) {
        // Remove plate if already selected
        return prevPlates.filter((plate) => plate.id !== selectedPlate.id);
      } else {
        // Add plate if not selected
        return [...prevPlates, selectedPlate];
      }
    });
  }

  // Send Order to Backend
  async function handleSendOrder() {
    try {
      const response = await updatePlates(userPlates);
      console.log("Order response:", response);
      alert("Order sent to the kitchen!");
      setUserPlates([]);
    } catch (error) {
      console.error("Failed to send order:", error);
      alert("Failed to send order. Please try again.");
    }
  }

  // Clear the current order
  function clearOrder() {
    setUserPlates([]);
  }

  return (
    <div>
      <h1>Le Menu Arrives</h1>
      <h5>
        {" "}
        Press the image to send it to order list. 
        <br/>
        If you want to remove any food item from the order list, press the image food again.
        </h5>

     <h2> <Menu onSelectPlate={handleSelectPlate} /> </h2>
      <h2>Your Order</h2>
      <ul>
        {userPlates.map((plate) => (
          <li key={plate.id}>
            {plate.plateName} - €{plate.price}
          </li>
        ))}
      </ul>
      {userPlates.length > 0 && (
        <div>
          <button onClick={handleSendOrder}>Send Order</button>
          <button onClick={clearOrder}> Clear Order </button>
        </div>
      )}
        {["staff", "manager"].includes(localStorage.getItem("role")) && <p> <Link to="/kitchen"><button>Kitchen Orders</button></Link>  </p>}
        {localStorage.getItem('role') === "manager" && <p> <Link to="/menuGestor"><button>Manage Menu</button></Link>  </p>}
     
        {localStorage.getItem('role') === ("client") && <p>
      <hr/>
      If you want to close your orders and ask the bill, press the button below <br/>
      <Link to="/logout"><button> Checkout </button></Link></p>}
    </div>
  );
}

export default IndexMenu;
