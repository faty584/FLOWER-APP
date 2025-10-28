import React, { useState } from 'react';
import axios from 'axios';
import './Addflower.css';

const Addflower = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle form submission=
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      // ✅ Correct API endpoint
      const response = await axios.post(
        'https://flower-deliverybackend.onrender.com/api/flowers',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('✅ Server response:', response.data);
      setMessage('Flower added successfully!');

      // Reset form
      setForm({
        name: '',
        category: '',
        description: '',
        price: '',
        image: null,
      });
    } catch (error) {
      console.error('❌ Error response:', error.response?.data || error.message);
      setMessage('Failed to add flower.');
    }

    setLoading(false);
  };

  return (
    <div className="addflower-container">
      <form className="addflower-form" onSubmit={handleSubmit}>
        <h2>Add New Flower</h2>

        <label>
          image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          category:
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          price:
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Flower'}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default Addflower;
