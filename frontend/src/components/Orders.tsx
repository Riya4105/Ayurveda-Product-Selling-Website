import React from 'react';
import { X, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface OrdersProps {
  isOpen: boolean;
  onClose: () => void;
}

const Orders: React.FC<OrdersProps> = ({ isOpen, onClose }) => {
  const { orders } = useUser();

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <Package className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Package className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">My Orders</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto p-4">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Package className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">No orders yet</p>
                <p className="text-sm">Your order history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          Placed on {order.orderDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex items-center space-x-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              Qty: {item.quantity} × {formatPrice(item.product.price)}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-gray-800">Delivery Address</p>
                          <p className="text-gray-600">
                            {order.customerInfo.firstName} {order.customerInfo.lastName}
                          </p>
                          <p className="text-gray-600">{order.customerInfo.address}</p>
                          <p className="text-gray-600">
                            {order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Total Amount</span>
                      <span className="text-lg font-semibold text-green-600">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                        Track Order
                      </button>
                      {order.status === 'delivered' && (
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;