import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Obtener clientSecret desde el backend
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000 }), // Monto de ejemplo ($50.00)
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Pago completado:', paymentIntent);

      // Redirigir a la confirmación del pedido
      const orderDetails = {
        orderId: paymentIntent.id,
        total: 5000,
        date: new Date().toLocaleString(),
        items: [{ id: 1, name: "Producto Ejemplo", price: 50, quantity: 1 }],
      };
      navigate('/order-confirmation', { state: { orderDetails } });
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <CardElement />
      <button onClick={handlePayment} className="btn btn-success mt-3">Pagar</button>
    </div>
  );
};

export default Checkout;
