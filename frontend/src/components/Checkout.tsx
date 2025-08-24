import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const validateForm = () => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrderId = 'ORD' + Date.now().toString().slice(-8);
    setOrderId(newOrderId);
    setOrderPlaced(true);
    setIsProcessing(false);
    clearCart();
  };

  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryCharge;

  if (!isOpen) return null;

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">Your order #{orderId} has been confirmed.</p>
            <p className="text-sm text-gray-500 mb-6">
              You will receive a confirmation email shortly with tracking details.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="text-sm font-medium">Details</span>
                </div>
                <div className={`w-8 h-1 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="text-sm font-medium">Payment</span>
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Main Content */}
              <div className="flex-1 p-6">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Shipping Information</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (validateForm()) {
                          setCurrentStep(2);
                        }
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
                    
                    <div className="space-y-4">
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleInputChange}
                            className="text-green-600"
                          />
                          <Truck className="w-6 h-6 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-800">Cash on Delivery</p>
                            <p className="text-sm text-gray-600">Pay when your order arrives</p>
                          </div>
                        </label>
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="text-green-600"
                          />
                          <CreditCard className="w-6 h-6 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-800">Credit/Debit Card</p>
                            <p className="text-sm text-gray-600">Secure payment with your card</p>
                          </div>
                        </label>
                        
                        {formData.paymentMethod === 'card' && (
                          <div className="mt-4 space-y-3 border-t pt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Card Number
                              </label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  CVV
                                </label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cardholder Name
                              </label>
                              <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${formData.paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={formData.paymentMethod === 'upi'}
                            onChange={handleInputChange}
                            className="text-green-600"
                          />
                          <Shield className="w-6 h-6 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-800">UPI Payment</p>
                            <p className="text-sm text-gray-600">Pay using UPI apps</p>
                          </div>
                        </label>
                        
                        {formData.paymentMethod === 'upi' && (
                          <div className="mt-4 space-y-3 border-t pt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                UPI ID
                              </label>
                              <input
                                type="text"
                                placeholder="yourname@paytm"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            </div>
                            <div className="flex space-x-2">
                              <button type="button" className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium">
                                Google Pay
                              </button>
                              <button type="button" className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium">
                                PhonePe
                              </button>
                              <button type="button" className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg text-sm font-medium">
                                Paytm
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Security Notice */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-800">Secure Payment</h4>
                        </div>
                        <p className="text-sm text-green-700">
                          Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="w-80 bg-gray-50 p-6 border-l border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-gray-900">
                      {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  {totalPrice < 500 && (
                    <p className="text-xs text-green-600">
                      Add {formatPrice(500 - totalPrice)} more for free delivery
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span className="text-green-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;