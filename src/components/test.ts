import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

/***
 *
 *      Note this api has to accept POST request with cart items passed
 *        as the request body.  Using GET request is just for testing
 *          with static data
 *
 */
const stripe = new Stripe(
  "sk_test_51NVJ4RECpTjJRRCodmsyMIK613vbK0ElhyUwMReszzx6qs8FzZQDdi8VtZ5DjYkn5gNQryjTDMNkf01QLKVwxwTP00DT8HavNL",
  {
    typescript: true,
    apiVersion: "2023-10-16",
  },
);

export async function GET(req: NextRequest) {
  const items = [
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: 100,
        product_data: {
          name: "Test product",
          description: "test products description",
          images: [
            "https://cdn.rebrickable.com/media/thumbs/sets/5006530-1/79749.jpg/1000x800p.jpg",
          ],
        },
      },
    },
    // {
    //   quantity: 1,
    //   price_data:{
    //     currency: "usd",
    //     unit_amount: 100,
    //     product_data:{
    //       name: 'Test product',
    //       description: "test products description",
    //       images: ['https://m.media-amazon.com/images/I/61FPCiv2cvL._AC_UY300_.jpg']
    //     }
    //   }
    // },
    // {
    //   quantity: 1,
    //   price_data:{
    //     currency: "usd",
    //     unit_amount: 100,
    //     product_data:{
    //       name: 'Test product',
    //       description: "test products description",
    //       images: ['https://cdn.rebrickable.com/media/thumbs/sets/5006530-1/79749.jpg/1000x800p.jpg']
    //     }
    //   }
    // },
    // {
    //   quantity: 1,
    //   price_data:{
    //     currency: "usd",
    //     unit_amount: 100,
    //     product_data:{
    //       name: 'Test product',
    //       description: "test products description",
    //       images: ['https://m.media-amazon.com/images/I/61FPCiv2cvL._AC_UY300_.jpg']
    //     }
    //   }
    // },
    // {
    //   quantity: 1,
    //   price_data:{
    //     currency: "usd",
    //     unit_amount: 100,
    //     product_data:{
    //       name: 'Test product',
    //       description: "test products description",
    //       images: ['https://cdn.rebrickable.com/media/thumbs/sets/5006530-1/79749.jpg/1000x800p.jpg']
    //     }
    //   }
    // },
    // {
    //   quantity: 1,
    //   price_data:{
    //     currency: "usd",
    //     unit_amount: 100,
    //     product_data:{
    //       name: 'Test product',
    //       description: "test products description",
    //       images: ['https://m.media-amazon.com/images/I/61FPCiv2cvL._AC_UY300_.jpg']
    //     }
    //   }
    // }
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: "http://localhost:3000/payment-succeeded",
    customer_email: "fonchu.e.venyuy@gmail.com",
  });

  console.log(session);
  if (session.url) {
    return NextResponse.redirect(new URL(session.url));
  } else {
    return new NextResponse("pay", {
      status: 400,
    });
  }
}