import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Home from './pages/Home';

function App() {
  return (
    <>
      <header>
        <Nav />
      </header>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/category/:id" element={<Category />} />
      </Routes>
    </>
  );
}

export default App;
