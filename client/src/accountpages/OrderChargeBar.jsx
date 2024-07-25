import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrderChargeBar(){
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [currentOrders, setCurrentOrders] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/menu-items');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Failed to fetch menu items', error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchCurrentOrders = async () => {
      if (token) {
        const userId = JSON.parse(atob(token.split('.')[1])).userId;
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${userId}/orders`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setCurrentOrders(response.data);
        } catch (error) {
          console.error('Failed to fetch current orders', error);
        }
      }
    };
  
    fetchCurrentOrders();
  }, [token]);

  const addToOrder = (menuItemId, quantity) => {
    setOrderItems([...orderItems, { menuItemId, quantity }]);
  };

  const handleSubmitOrder = async () => {
    if (!token) {
      setConfirmationMessage('Please log in to place an order.');
      return;
    }

    const userId = JSON.parse(atob(token.split('.')[1])).userId;
    const totalPrice = orderItems.reduce((total, item) => {
      const menuItem = menuItems.find(menuItem => menuItem.id === item.menuItemId);
      return total + (menuItem.price * item.quantity);
    }, 0);

    try {
      const response = await axios.post('http://localhost:8080/api/orders', {
        userId,
        totalPrice,
        status: 'Pending',
        orderItems
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setConfirmationMessage('Order placed successfully!');
      setOrderItems([]);

      setTimeout(() => {
        navigate(0);
      }, 500);

    } catch (error) {
      console.error('Failed to place order', error);
      setConfirmationMessage('Failed to place your order. Please try again.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCurrentOrders(currentOrders.filter(order => order.id !== orderId));
      setConfirmationMessage('Order deleted successfully.');
    } catch (error) {
      console.error('Failed to delete order', error);
      setConfirmationMessage('Failed to delete the order. Please try again.');
    }
  };
  
  return (
    <div className="order-page">
      <h1>Welcome to the Recharge Bar! <img src="https://static.vecteezy.com/system/resources/thumbnails/035/061/361/small_2x/lightning-logo-template-bolt-logo-element-strom-icon-vector.jpg" height="70px" alt="Logo" />
      </h1>
      <h1> Place Your Order Below </h1>
      <div className="menu-items-wrapper">
        <div className="menu-items">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.imageUrl} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => addToOrder(item.id, 1)}>Add to Order</button>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {orderItems.map((orderItem, index) => {
              const menuItem = menuItems.find(item => item.id === orderItem.menuItemId);
              return (
                <li key={index}>
                  <img src={menuItem.imageUrl} alt={menuItem.name} width="50" height="50" />
                  {menuItem.name} x {orderItem.quantity}
                </li>
              );
            })}
          </ul>
          <button onClick={handleSubmitOrder}>Place Order</button>
          {confirmationMessage && <p>{confirmationMessage}</p>}
  <div className="current-orders">
  <h2>Your Current Orders</h2>
  {currentOrders.length > 0 ? (
    currentOrders.map(order => (
      <div key={order.id} className="order">
        <h3>Order #{order.id}</h3>
        <p>Status: {order.status}</p>
        <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
        {/* <button onClick={() => handleDeleteOrder(order.id)}>Cancel Your Order</button> */}
      </div>
    ))
  ) : (
    <p>You have no current orders.</p>
  )}
    </div>
        </div>
      
      </div>

    </div>
  );
}

export default OrderChargeBar;