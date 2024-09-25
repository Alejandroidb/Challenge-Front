import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Home from "./views/Home";
import Products from "./views/Products";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import { useState } from "react";
import CartPage from "./pages/CartPage";
import Checkout from "./components/Checkout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
        <Route path="/registrarse" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/productos" element={<Products />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes> 
    </>
  );
}

export default App;
