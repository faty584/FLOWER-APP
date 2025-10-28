import React, { useState } from "react";
import axios from "axios";

const AddFlower = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Flower Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Add Flower"}
      </button>
    </form>
  );
};

export default AddFlower;
