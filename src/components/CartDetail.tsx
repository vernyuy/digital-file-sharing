/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Stripe from "stripe";

const CartDetail = ({ cart, removeFromCart, clearCart }: any) => {
  const totalPrice = cart.reduce((total: any, item: { price: any; }) => total + item.price, 0);
  const [isLoading, setIsLoading] = useState(false)

  const stripePayment = async () => {
    console.log("I'm here")
    setIsLoading(true)
    const stripe = new Stripe(
      "sk_test_51NVJ4RECpTjJRRCodmsyMIK613vbK0ElhyUwMReszzx6qs8FzZQDdi8VtZ5DjYkn5gNQryjTDMNkf01QLKVwxwTP00DT8HavNL",
      {
        typescript: true,
        apiVersion: "2023-10-16",
      }
    );
    const p: any[] = [];
 cart.map((item: { price: number; name: any; image: any; })=>p.push({
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price*100,
      product_data: {
        name: item.name,
        description: "test products description",
        images: [
            item.image,
        //   "https://cdn.rebrickable.com/media/thumbs/sets/5006530-1/79749.jpg/1000x800p.jpg",
        ],
      },
    },
  },))
  console.log(p)
    const items = p

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: "http://localhost:3000",
    //   customer_email: "fonchu.e.venyuy@gmail.com",
    });
    if (session.url) {
      console.log("Success");
    //   window.location.replace(session.url);
      window.open(session.url, '_blank');
    } else {
      console.log("failed");
    }
    setIsLoading(false)
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

      <div className="bg-white shadow-xl rounded-lg p-8">
        <div className="flex flex-col space-y-6">
          {cart.map((item: { id: React.Key | null | undefined; image: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item?item.name?.toString():''}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 mt-6 border-t">
            <h3 className="text-xl font-semibold">Total</h3>
            <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Clear Cart
            </button>
            <button
                onClick={()=>stripePayment()}
                disabled={isLoading}
              className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              {isLoading?'Loading':'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
