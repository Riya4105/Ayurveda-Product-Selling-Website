import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product, CartContextType } from '../types';
import { CheckCircle } from 'lucide-react';

interface CartState {
  items: CartItem[];
  notification: string | null;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'CLEAR_NOTIFICATION' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.product.id === action.product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          notification: `${action.product.name} quantity updated in cart!`
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.product, quantity: 1 }],
          notification: `${action.product.name} added to cart!`
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId),
        notification: null
      };

    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.productId),
          notification: null
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
        notification: null
      };

    case 'CLEAR_CART':
      return { ...state, items: [], notification: null };

    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], notification: null });

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
    // Clear notification after 3 seconds
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 3000);
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      notification: state.notification,
      clearNotification,
      totalItems,
      totalPrice
    }}>
      {children}
      {/* Notification Toast */}
      {state.notification && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{state.notification}</span>
          <button
            onClick={clearNotification}
            className="ml-2 text-green-200 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};