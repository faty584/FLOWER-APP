import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Flowers from './Pages/Flower/Flower';
import AddFlowers from './Pages/Addflower/AddFlower';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/flowers' />}></Route>
        <Route path='/flowers' element={<Flowers/>}></Route>
        <Route path='/add-flowers' element={<AddFlowers/>}></Route>
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;