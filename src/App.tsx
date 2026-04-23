import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import LiveTracking from './pages/LiveTracking';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BottomNav from './components/BottomNav';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg-color)] font-sans text-[var(--text-color)] flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracking" element={<LiveTracking />} />
          </Routes>
        </main>
        
        <Footer />
        <CartSidebar />
        <BottomNav />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
