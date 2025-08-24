import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Order, WishlistItem, Product } from '../types';

interface UserContextType {
  user: User | null;
  orders: Order[];
  wishlist: WishlistItem[];
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addOrder: (order: Order) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    joinDate: new Date('2024-01-15')
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD12345678',
      items: [
        {
          product: {
            id: '1',
            name: 'Ashwagandha Capsules',
            image: 'https://images.pexels.com/photos/5946024/pexels-photo-5946024.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Premium quality Ashwagandha root extract capsules',
            contents: ['Ashwagandha Root Extract (500mg)'],
            dosage: 'Take 1-2 capsules daily',
            price: 899,
            rating: 4.5,
            reviews: 324,
            category: 'Herbs & Supplements',
            inStock: true
          },
          quantity: 2
        }
      ],
      customerInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        paymentMethod: 'cod'
      },
      totalAmount: 1798,
      orderDate: new Date('2024-12-15'),
      status: 'delivered'
    },
    {
      id: 'ORD12345679',
      items: [
        {
          product: {
            id: '2',
            name: 'Triphala Churna',
            image: 'https://images.pexels.com/photos/4022090/pexels-photo-4022090.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Traditional Ayurvedic formulation for digestive health',
            contents: ['Amalaki', 'Bibhitaki', 'Haritaki'],
            dosage: 'Mix 1-2 teaspoons with warm water',
            price: 549,
            rating: 4.3,
            reviews: 156,
            category: 'Digestive Health',
            inStock: true
          },
          quantity: 1
        }
      ],
      customerInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        paymentMethod: 'upi'
      },
      totalAmount: 549,
      orderDate: new Date('2024-12-20'),
      status: 'shipped'
    }
  ]);

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    setWishlist([]);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist(prev => [...prev, { product, addedDate: new Date() }]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.product.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product.id === productId);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <UserContext.Provider value={{
      user,
      orders,
      wishlist,
      isLoggedIn: !!user,
      login,
      logout,
      updateProfile,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      addOrder
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};