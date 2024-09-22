import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';

const stripePromise = loadStripe('tu_clave_publica_de_stripe');

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Obtener clientSecret desde el backend
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000 }), // Ejemplo de monto ($50.00)
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

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
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <CardElement />
      <button onClick={handlePayment}>Pagar</button>
    </div>
  );
};

export default Checkout;
