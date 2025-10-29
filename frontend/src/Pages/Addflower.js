import React, { useState } from "react";
import axios from "axios";
import './Addflower.css';

const Addflower = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Step 1: Create FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", imageFile); // important! matches upload.single('image')

      // ✅ Step 2: Send to backend (replace with your real Render API URL)
      const res = await axios.post(
        "https://flower-deliverybackend.onrender.com/api/flowers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Flower added:", res.data);
      alert("Flower added successfully!");

      // ✅ Step 3: Clear form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageFile(null);
    } catch (error) {
      console.error("❌ Error response:", error.response || error);
      alert("Failed to upload flower. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addflower-container">
      <form className="addflower-form" onSubmit={handleSubmit}>
        <h2>Add New Flower</h2>

        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Flower Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Flower"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default Addflower;
