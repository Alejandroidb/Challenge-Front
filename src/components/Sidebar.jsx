import React, { useEffect, useState } from 'react';
import '../assets/css/Products.css'; 

const Sidebar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categorias'); 
        if (!response.ok) {
          throw new Error('Error al obtener categorías');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="sidebar">
      <h4>Categorías</h4>
      <ul className="list-group">
        {categories.map((category, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => onSelectCategory(category.categoria)}
            style={{ cursor: 'pointer' }}
          >
            {category.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
