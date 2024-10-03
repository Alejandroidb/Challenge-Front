import React, { useEffect } from "react";
import useCartStore from "../context/CartContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, removeFromCart, addToCart, loadCartFromStorage } =
    useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const increaseQuantity = (product) => {
    const updatedProduct = { ...product, quantity: 1 };
    addToCart(updatedProduct);
  };

  const decreaseQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: - 1 };
      addToCart(updatedProduct);
    } else {
      removeFromCart(productId);
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.precio * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
      <h2>Tu Carrito:</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="row">
          {cart.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.foto_de_producto}
                      alt={item.nombre}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h3 className="card-title">{item.nombre}</h3>
                      <p className="card-text">Precio: ${item.precio}</p>
                      <p className="card-text">Cantidad: {item.quantity}</p>
                      <div className="button-group">
                        <button
                          className="btn btn-outline-primary me-2"
                          onClick={() => increaseQuantity(item)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-outline-primary me-2"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="col-md-12 mt-4 d-flex justify-content-between">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/productos")}
            >
              Volver a productos
            </button>
            <h4>Precio Total: ${getTotalPrice()}</h4>
            <button
              className="btn btn-success"
              onClick={() => navigate("/checkout")}
            >
              Proceder al pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
