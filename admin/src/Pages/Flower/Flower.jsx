import "../Flower/Flower.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Flowers = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchFlowers = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}`
      );
      const data = await res.json();
      console.log("Fetched data from backend:", data);
      console.log("Is data.flowers an array?", Array.isArray(data.flowers));
      console.log("data.flowers:", data.flowers);

      if (data.flowers && Array.isArray(data.flowers)) {
        setFlowers(data.flowers);
        setLoading(false)
      } else {
        setFlowers([]);
      }
    } catch (error) {
      console.error("Failed to fetch flowers:", error);
      setFlowers([]);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this flower?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await fetch(
          `https://flower-delivery-website-m3-api.onrender.com/api/flowers/${id}`,
          {
            method: "DELETE",
          }
        );
        await fetchFlowers();
        Swal.fire("Deleted!", "The Flower has been deleted.", "success");
      } catch (error) {
        Swal.fire("Delete Failed:", error);
      }
    }
  };

  if(loading) return <p className="loading">Loading...</p>

  
  return (
    <div className="container">
      <div className="flower-list">
        {flowers.map((flower) => (
          <div className="flower-card" key={flower._id}>
            <div className="flower-img">
              <img
                src={flower.image}
                alt={flower.name}
              />
              <span
                className="delete-icon material-symbols-outlined"
                onClick={() => handleDelete(flower._id)}
              >
                delete
              </span>
            </div>
            <div className="flower-details">
              <p>
                <strong>Name:</strong> {flower.name}
              </p>
              <p>
                <strong>Category:</strong> {flower.category}
              </p>
              <p>
                <strong>Price:</strong> {`$${flower.price}`}
              </p>
              <p>
                <strong>Description:</strong> {flower.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flowers;
