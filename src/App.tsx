/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductCard from "./components/ProductCard";
import CartDetail from "./components/CartDetail";
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function App() {

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      // next: (data) => setTodos([...data.items]),
    });
  }, []);

  const [cart, setCart]: any[] = useState([]);

  // Function to handle adding products to the cart
  const addToCart = (product: any) => {
    setCart((prevCart: any) => [...prevCart, product]);
  };
  // Remove item from the cart
  const removeFromCart = (productId: any) => {
    setCart(cart.filter((item: any) => item.id !== productId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  const featuredProducts = [
    { id: 1, name: 'Electric Guitar', price: 499.99, image: 'https://via.placeholder.com/300x200?text=Electric+Guitar' },
    { id: 2, name: 'Acoustic Guitar', price: 299.99, image: 'https://via.placeholder.com/300x200?text=Acoustic+Guitar' },
    { id: 3, name: 'DJ Turntable', price: 399.99, image: 'https://via.placeholder.com/300x200?text=DJ+Turntable' },
    { id: 4, name: 'Headphones', price: 129.99, image: 'https://via.placeholder.com/300x200?text=Headphones' },
  ];


  return (
<Router>
      <div className="font-sans bg-gray-100">
        {/* Header Section with Cart Icon */}
        <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-6">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">MusicShop</h1>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
              <li><Link to="#shop" className="hover:text-gray-200">Shop</Link></li>
              <li><Link to="#about" className="hover:text-gray-200">About</Link></li>
              <li><Link to="#contact" className="hover:text-gray-200">Contact</Link></li>
              {/* Cart Icon with item count */}
              <li className="relative">
                <Link to="/cart" className="text-white hover:text-gray-200">
                  <span className="material-icons">shopping_cart</span>
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 text-sm bg-red-500 text-white rounded-full px-2 py-1">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          {/* Home Page with Product List */}
          <Route path="/" element={
            <section id="shop" className="py-16 bg-white">
 {/* <StorageImage alt="sleepy-cat" path="public/airbnb.jpg" /> */}
    <FileUploader
      acceptedFileTypes={['image/*', 'audio/*']}
      path="/"
      maxFileCount={1}
      isResumable
    />
              <div className="container mx-auto text-center">
                <h3 className="text-3xl font-bold mb-6">Featured Products</h3>
                <div className="grid px-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      addToCart={addToCart}
                      isInCart={cart.some((item: any) => item.id === product.id)}
                    />
                  ))}
                </div>
              </div>
            </section>
          } />
          
          <Route path="/cart" element={<CartDetail cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
