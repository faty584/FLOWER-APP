import axios from 'axios';
import { useEffect, useState } from 'react';
import './Flower.css';

const Flower = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const getFlowers = async () => {
      try {
        const response = await axios.get(
          'https://flower-delivery-backend1.onrender.com/api/flowers'
        );
        console.log('API response:', response.data);
        // backend returns { flowers: [...] }
        const data = response.data && response.data.flowers ? response.data.flowers : response.data;
        setFlowers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log('Error fetching flowers:', error);
      }
    };
    getFlowers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flower?')) return;
    try {
      await axios.delete(
        `https://flower-delivery-backend1.onrender.com/api/flowers/${id}`
      );

      setFlowers((prev) => prev.filter((flower) => flower._id !== id));
    } catch (error) {
      alert('Failed to delete flower');
    }
  };

  return (
    <div className="flower-list">
      {flowers.map((flower) => (
        <div key={flower._id} className="flower-card">
          <div className="image-con">
            <img
              className="image"
              src={flower.image}
              alt={flower.name}
            />
          </div>

          <div className="texts">
            <p className="nameclass">
              <span className="Naming">Name:</span> {flower.name}
            </p>
            <p className="categoryclass">
              <span className="Naming">Category:</span> {flower.category}
            </p>
            <p className="priceclass">
              <span className="Naming">Price:</span> ${flower.price}
            </p>
            <p className="descriptionclass">
              <span className="Naming">Description:</span>{' '}
              {flower.description || 'No description'}
            </p>

            {/* Normal button instead of emoji */}
            <button
              className="deleteButton"
              onClick={() => handleDelete(flower._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Flower;
