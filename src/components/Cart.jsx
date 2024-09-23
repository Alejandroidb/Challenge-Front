import React, { useEffect } from "react";
import useCartStore from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, addToCart, loadCartFromStorage } =
    useCartStore();

  useEffect(() => {
    loadCartFromStorage(); // Cargar el carrito desde localStorage al inicio
  }, []);

  const increaseQuantity = (product) => {
    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    removeFromCart(product.id); // Remover el producto actual
    addToCart(updatedProduct); // Agregar el producto con la cantidad incrementada
  };

  const decreaseQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      removeFromCart(productId); // Remover el producto actual
      addToCart(updatedProduct); // Agregar el producto con la cantidad decrementada
    } else {
      removeFromCart(productId); // Si la cantidad es 1, simplemente lo removemos
    }
  };

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => increaseQuantity(item)}>+</button>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
