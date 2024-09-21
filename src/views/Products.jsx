import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import '../assets/css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null)

  const getProductos = async () => {
   const token = localStorage.getItem("token")
   if (!token) {
    setError("No autorizado para acceder a esta página");
    setLoading(false);
    return;
   }
   console.log("Token:", token);
    try {

      let url = `http://localhost:3000/productos?page=${page}&limit=20`;
      if (selectedCategory) {
        url = `http://localhost:3000/productos/categoria/${categoria}?page=${page}&limit=20`
      }

      const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setProducts(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, [selectedCategory, page]);

  const manejoPaginas = (nuevaPag) => {
    if (nuevaPag >= 1 && nuevaPag <= totalPages) {
      setPage(nuevaPag);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <Sidebar onSelectCategory={setSelectedCategory}/>
      <div className="products-content">
        <h1>Productos</h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card">
                <img
                  className="card-img-top img-fluid custom"
                  src={product.foto_de_producto}
                  alt={product.nombre}
                />
                <div className="card-body">
                  <hr />
                  <p className="card-text">
                    <small>{product.categoria}</small>
                  </p>
                  <h5 className="card-title">{product.nombre}</h5>
                  <p className="card-text">${product.precio}</p>
                  <hr />
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <button className="btn btn-outline-primary">
                    Agregar al carro
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={() => manejoPaginas(page - 1)} disabled={page === 1}>
            Anterior
          </button>
          <span>Página {page} de {totalPages}</span>
          <button className="btn btn-secondary" onClick={() => manejoPaginas(page + 1)} disabled={page === totalPages}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
