import {create} from 'zustand';

const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],

  addToCart: (product) => set((state) => {
    const updatedCart = [...state.cart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Guardar carrito en localStorage
    return { cart: updatedCart };
  }),

  removeFromCart: (productId) => set((state) => {
    const updatedCart = state.cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Actualizar localStorage
    return { cart: updatedCart };
  }),

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },

  loadCartFromStorage: () => set(() => ({
    cart: JSON.parse(localStorage.getItem('cart')) || []
  })),
}));

export default useCartStore;
