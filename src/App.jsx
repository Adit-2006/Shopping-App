import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SearchPage from './pages/SeatchPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import ProductDetailsPage from './pages/ProductDetailsPage';


function App() {


  return (
    <>
    <BrowserRouter>
    <NavBar />

    <Routes>
      <Route path='/' element = {<Home /> } />
      <Route path='/search' element = {<SearchPage />} />
      <Route path='/cart' element = {<CartPage />} />
      <Route path='/checkout' element = {<CheckoutPage /> } />
      <Route path='/wishlist' element = {<WishlistPage />} />
      <Route path='/product/:id' element = {<ProductDetailsPage />} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
