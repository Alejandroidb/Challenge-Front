import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  return (
    <div className="container mt-5">
      <h2>¡Gracias por tu compra!</h2>
      <p>Tu pedido ha sido realizado con éxito. Aquí están los detalles:</p>
      
      {orderDetails ? (
        <div className="order-details">
          <h4>Número de pedido: {orderDetails.orderId}</h4>
          <p><strong>Total:</strong> ${orderDetails.total}</p>
          <p><strong>Fecha:</strong> {orderDetails.date}</p>
          
          <h5>Productos:</h5>
          <ul>
            {orderDetails.items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron detalles del pedido.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
