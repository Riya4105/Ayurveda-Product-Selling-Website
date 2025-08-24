import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import Orders from './components/Orders';
import Wishlist from './components/Wishlist';
import AccountSettings from './components/AccountSettings';
import ProductRating from './components/ProductRating';
import { products } from './data/products';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)));
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.contents.some(content => 
                            content.toLowerCase().includes(searchQuery.toLowerCase())
                          );
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header 
            onCartOpen={() => setIsCartOpen(true)} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onProfileOpen={() => setIsProfileOpen(true)}
            onOrdersOpen={() => setIsOrdersOpen(true)}
            onWishlistOpen={() => setIsWishlistOpen(true)}
            onAccountSettingsOpen={() => setIsAccountSettingsOpen(true)}
          />
          
          <Hero />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} results for "{searchQuery}"
                  {filteredProducts.length > 0 && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-green-600 hover:text-green-700 text-sm underline"
                    >
                      Clear search
                    </button>
                  )}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search or category filter.</p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </main>

          <Cart 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)}
            onCheckout={handleCheckout}
          />
          
          <Checkout 
            isOpen={isCheckoutOpen}
            onClose={handleCheckoutClose}
          />
          
          <Profile 
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
          
          <Orders 
            isOpen={isOrdersOpen}
            onClose={() => setIsOrdersOpen(false)}
          />
          
          <Wishlist 
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
          />
          
          <AccountSettings 
            isOpen={isAccountSettingsOpen}
            onClose={() => setIsAccountSettingsOpen(false)}
          />

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">AyurVeda</h3>
                  <p className="text-gray-300 text-sm">
                    Your trusted partner in natural wellness and Ayurvedic healing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white">About Us</a></li>
                    <li><a href="#" className="hover:text-white">Our Products</a></li>
                    <li><a href="#" className="hover:text-white">Health Tips</a></li>
                    <li><a href="#" className="hover:text-white">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Categories</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white">Herbs & Supplements</a></li>
                    <li><a href="#" className="hover:text-white">Immunity</a></li>
                    <li><a href="#" className="hover:text-white">Digestive Health</a></li>
                    <li><a href="#" className="hover:text-white">Skin Care</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white">Help Center</a></li>
                    <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                    <li><a href="#" className="hover:text-white">Returns</a></li>
                    <li><a href="#" className="hover:text-white">Track Order</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2025 AyurVeda. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;