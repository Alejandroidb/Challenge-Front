const API_URL = 'http://localhost:3000/api';

// Obtener productos
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

// Agregar productos al carrito
export const addToCart = async (product) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

// Crear pedido
export const createOrder = async (cart, userDetails) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cart, userDetails }),
  });
  return response.json();
};
