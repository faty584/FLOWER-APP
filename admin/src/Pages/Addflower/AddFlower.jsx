import "../Addflower/AddFlower.css";
import { useState } from "react";
import UploadCloud from "../Icons/cloud-upload.svg";

const AddFlowers = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setForm({
      ...form,
      [fieldName]: fieldValue,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const result = await res.json();

      if (res.ok) {
        setMessage("🌸 Flower Submitted Successfully!");
        setMessageType("success");

        setForm({
          name: "",
          category: "",
          price: "",
          description: "",
        });

        setImage(null);
        setPreview(null);
        document.getElementById("imageInput").value = null;
      } else {
        console.error("Upload failed", result);
        setMessage("❌ Failed to submit flower.");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error submitting flower:", err);
      setMessage("❌ Something went wrong.");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  return (
    <div className="container">
      {message && <div className={`alert ${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="imageInput">Image</label>
        <label htmlFor="imageInput" className="upload-box">
          {preview ? (
            <img src={preview} alt="preview" className="preview" />
          ) : (
            <img className="cloud" src={UploadCloud} alt="upload-icon" />
          )}
        </label>
        <input
          id="imageInput"
          className="upload-box"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <div className="row">
          <div className="category">
            <label>Category</label>
            <select
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">-- Select Category --</option>
              <option value="Fresh Flowers">Fresh Flowers</option>
              <option value="Dried Flowers">Dried Flowers</option>
              <option value="Live Plants">Live Plants</option>
              <option value="Aroma Candels">Aroma Candels</option>
              <option value="Fresheners">Fresheners</option>
            </select>
          </div>
          <div className="price">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>
        <button className="submit-btn" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};
export default AddFlowers;
