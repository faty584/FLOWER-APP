import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  return ( 
    <div className="parent">
      <div className="second-parent">
        <div className="admintext">
          <h2>Admin Panel</h2>
        </div>
        <div className="buttons">
          <Link to="/flowers">
            <button className="flowerbutton">Flowers</button>
          </Link>
          <Link to="/add">
            <button className="addflowersButton">Add Flowers</button>
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;