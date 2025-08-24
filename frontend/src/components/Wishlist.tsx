import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist } = useUser();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                My Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Heart className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">Your wishlist is empty</p>
                <p className="text-sm">Save items you love for later</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.product.category}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {formatPrice(item.product.price)}
                          {item.product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through ml-2">
                              {formatPrice(item.product.originalPrice)}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Added on {item.addedDate.toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item.product.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="mt-3 text-xs text-gray-600">
                      <p className="line-clamp-2">{item.product.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleAddToCart(item.product)}
                        disabled={!item.product.inStock}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-1 transition-colors ${
                          item.product.inStock
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{item.product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.product.id)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={() => {
                  wishlist.forEach(item => {
                    if (item.product.inStock) {
                      addToCart(item.product);
                      removeFromWishlist(item.product.id);
                    }
                  });
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Add All to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;