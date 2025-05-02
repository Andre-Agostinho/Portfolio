
// ********************************************************************
// componentes da pagina da cozinha que recebe os pedidos dos clientes


import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// import '../components/Index.css';

export default function KitchenMenu() {
  const [kitchenOrders, setKitchenOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch("http://localhost:3010/kitchenorders")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data: ", data);
        setKitchenOrders(data.kitchen || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  };

  const startCooking = (orderId) => {
    setKitchenOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'cooking' } : order
      )
    );
  };


  const sendToDelivery = (orderId) => {
    fetch(`http://localhost:3010/kitchenorders`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderid: orderId }), 
    })
    .then(response => {
      if (response.ok) {
        setKitchenOrders(prevOrders =>
          prevOrders.filter(order => order.id !== orderId)
        );
      } else {
        throw new Error('Failed to delete order');
      }
    })
    .catch(error => console.error('Error deleting order:', error));
  };

  if (loading) return <p>Loading...</p>;
  if (kitchenOrders.length === 0) return <p>No orders available.</p>;

  return (
    <div>
      <h1> Kitchen Orders </h1>
    <div className="kitchen-orders-container">
      {kitchenOrders.map((order) => (
        <div key={order.id} className="kitchen-order-item">
          <h2>{order.plateName}</h2>
          <h3>{order.category}</h3>
          <p className='kitchen-status'>Status: {order.status || 'pending'}</p>
            <button id="cooking"
              onClick={() => startCooking(order.id)}
              className="start-cooking-btn"
            >
              Start Cooking
            </button>
            <button id="delivery"
              onClick={() => sendToDelivery(order.id)}
              className="send-delivery-btn"
            >
              Send to Delivery
            </button>
        </div>
      ))}
    </div>
    <Link to="/menu"> <button>Show Menu</button> </Link> <br/><br/>
    <Link to="/logout"> Sign off - End Shift </Link>
    </div>
  );
}
