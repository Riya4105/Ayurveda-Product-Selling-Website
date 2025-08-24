export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  contents: string[];
  dosage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  notification: string | null;
  clearNotification: () => void;
  totalItems: number;
  totalPrice: number;
}
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'card' | 'upi';
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CheckoutFormData;
  totalAmount: number;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  joinDate: Date;
}

export interface WishlistItem {
  product: Product;
  addedDate: Date;
}

export interface ProductRating {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  review: string;
  date: Date;
}