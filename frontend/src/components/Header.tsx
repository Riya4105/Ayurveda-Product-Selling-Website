import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, Heart, User, Bell } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

interface HeaderProps {
  onCartOpen: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onProfileOpen: () => void;
  onOrdersOpen: () => void;
  onWishlistOpen: () => void;
  onAccountSettingsOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onCartOpen, 
  searchQuery, 
  setSearchQuery, 
  onProfileOpen,
  onOrdersOpen,
  onWishlistOpen,
  onAccountSettingsOpen
}) => {
  const { totalItems } = useCart();
  const { wishlist, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is already handled by the searchQuery state
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AyurVeda</h1>
              <p className="text-xs text-gray-600">Natural Wellness</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Ayurvedic products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={onWishlistOpen}
              className="relative text-gray-600 hover:text-red-500 transition-colors p-2 group"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Wishlist ({wishlist.length})
              </div>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="text-gray-600 hover:text-green-600 transition-colors p-2"
              >
              <User className="w-6 h-6" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <button 
                    onClick={() => { onProfileOpen(); setIsProfileOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => { onOrdersOpen(); setIsProfileOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </button>
                  <button 
                    onClick={() => { onWishlistOpen(); setIsProfileOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Wishlist
                  </button>
                  <button 
                    onClick={() => { onAccountSettingsOpen(); setIsProfileOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account Settings
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={onCartOpen}
              className="relative text-gray-600 hover:text-green-600 transition-colors p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-green-600 transition-colors p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-800 hover:text-green-600 px-4 py-2">Categories</a>
              <a href="#" className="text-gray-800 hover:text-green-600 px-4 py-2">About Us</a>
              <a href="#" className="text-gray-800 hover:text-green-600 px-4 py-2">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;