import React from 'react';
import { Star, ShoppingBag, Heart, Award, Leaf } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useUser();
  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden group hover:-translate-y-2 relative">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quality badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full flex items-center space-x-1 shadow-lg">
          <Leaf className="w-3 h-3" />
          <span>100% Natural</span>
        </div>
        
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
            isWishlisted 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        
        {product.originalPrice && (
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
            <span className="flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>SAVE ₹{product.originalPrice - product.price}</span>
            </span>
          </div>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/90 px-4 py-2 rounded-full">
              <span className="text-gray-800 font-bold text-sm">Out of Stock</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Contents */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
            <Leaf className="w-3 h-3 mr-1 text-green-500" />
            Key Ingredients:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.contents.slice(0, 2).map((content, index) => (
              <span
                key={index}
                className="text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1 rounded-full border border-green-200 font-medium"
              >
                {content}
              </span>
            ))}
            {product.contents.length > 2 && (
              <span className="text-xs text-emerald-600 font-medium">
                +{product.contents.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Dosage */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-1">Dosage:</p>
          <p className="text-xs text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded-lg italic">{product.dosage}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
            {renderStars(product.rating)}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-2xl font-bold text-emerald-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg ${
            product.inStock
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-emerald-200'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-gray-200'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;