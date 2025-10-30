import { Link } from "react-router-dom";
import '../Header/Header.css';
import { useState } from "react";
const Header = () => {
    const [ activeButton, setActiveButton ] = useState(null);
    const handleClick = (button) => {
        setActiveButton(button);
    };


    return ( 
        <>
        <div className="header">
            <h1>Admin Panel</h1>
            <div className="header-buttons">
                <Link to="/flowers"><button className="flowers-btn"  onClick={() => handleClick('one')} style={{backgroundColor: activeButton === 'one' ? 'black' : '#f0f0f0', color: activeButton === 'one' ? 'white' : 'black'}}>Flowers</button></Link>
                <Link to="/add-flowers"><button onClick={() => handleClick('two')} style={{backgroundColor: activeButton === 'two' ? 'black' : '#f0f0f0', color: activeButton === 'two' ? 'white' : 'black' }} className="add-flowers-btn">Add Flowers</button></Link>
            </div>
        </div>
        <hr />
        </>
    );
}

export default Header;