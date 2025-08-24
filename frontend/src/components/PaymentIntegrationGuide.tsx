import React from 'react';
import { CreditCard, Smartphone, Shield, Globe } from 'lucide-react';

const PaymentIntegrationGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Gateway Integration Guide</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Razorpay */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Razorpay (Recommended for India)</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Complete payment solution with UPI, cards, wallets, and net banking support.
          </p>
          <div className="bg-gray-50 p-3 rounded text-xs font-mono">
            <p>npm install razorpay</p>
            <p className="mt-2">// Frontend Integration</p>
            <p>const rzp = new Razorpay(options);</p>
            <p>rzp.open();</p>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            ✓ UPI, Cards, Wallets<br/>
            ✓ 2% transaction fee<br/>
            ✓ Instant settlements
          </div>
        </div>

        {/* Stripe */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Stripe (International)</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Global payment platform with excellent developer experience and security.
          </p>
          <div className="bg-gray-50 p-3 rounded text-xs font-mono">
            <p>npm install @stripe/stripe-js</p>
            <p className="mt-2">// React Integration</p>
            <p>import {loadStripe} from '@stripe/stripe-js';</p>
            <p>const stripe = await loadStripe('pk_...');</p>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            ✓ Global coverage<br/>
            ✓ 2.9% + 30¢ per transaction<br/>
            ✓ Advanced fraud protection
          </div>
        </div>

        {/* PayU */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">PayU Money</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Popular in India with comprehensive payment options and easy integration.
          </p>
          <div className="bg-gray-50 p-3 rounded text-xs font-mono">
            <p>// PayU Integration</p>
            <p>const payuForm = document.createElement('form');</p>
            <p>payuForm.method = 'POST';</p>
            <p>payuForm.action = 'https://secure.payu.in/_payment';</p>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            ✓ UPI, Cards, EMI<br/>
            ✓ 2-3% transaction fee<br/>
            ✓ Quick setup
          </div>
        </div>

        {/* Google Pay */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold">Google Pay API</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Direct integration with Google Pay for seamless UPI payments.
          </p>
          <div className="bg-gray-50 p-3 rounded text-xs font-mono">
            <p>// Google Pay Web API</p>
            <p>const paymentRequest = new PaymentRequest(</p>
            <p>&nbsp;&nbsp;methodData, details, options</p>
            <p>);</p>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            ✓ Direct UPI integration<br/>
            ✓ No transaction fees<br/>
            ✓ Instant payments
          </div>
        </div>
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-semibold text-amber-800 mb-2">Implementation Steps:</h4>
        <ol className="text-sm text-amber-700 space-y-1">
          <li>1. Choose a payment gateway based on your target market</li>
          <li>2. Register and get API keys from the provider</li>
          <li>3. Install the SDK and configure your backend</li>
          <li>4. Implement frontend payment flow</li>
          <li>5. Set up webhooks for payment confirmations</li>
          <li>6. Test with sandbox/test mode before going live</li>
        </ol>
      </div>
    </div>
  );
};

export default PaymentIntegrationGuide;