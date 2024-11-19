/* eslint-disable @typescript-eslint/no-explicit-any */

const ProductCard = ({ product, addToCart, isInCart }: any) => {
  return (
    // <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
    //   {/* Image */}
    //   <img className="w-full h-64 object-cover" src={image} alt={name} />

    //   {/* Product Info */}
    //   <div className="p-6 bg-gray-50">
    //     {/* Product Name */}
    //     <h3 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition-colors duration-300">
    //       {name}
    //     </h3>

    //     {/* Product Price */}
    //     <p className="text-lg text-gray-900 font-bold">{`$${price}`}</p>

    //     {/* Add to Cart Button */}
    //     <button className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300">
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>

    // <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-orange-500 via-pink-500 to-black transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
    //   {/* Image */}
    //   <img className="w-full h-64 object-cover rounded-t-lg" src={image} alt={name} />

    //   {/* Product Info */}
    //   <div className="p-6 bg-black rounded-b-lg">
    //     {/* Product Name */}
    //     <h3 className="text-2xl font-bold text-white mb-2 hover:text-orange-400 transition-colors duration-300">
    //       {name}
    //     </h3>

    //     {/* Product Price */}
    //     <p className="text-xl text-pink-300 font-semibold mb-4">{`$${price}`}</p>

    //     {/* Add to Cart Button */}
    //     <button className="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition-colors duration-300">
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>



    <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Gradient Border (via pseudo-element) */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-black rounded-lg -z-10"></div>
      
      {/* Image */}
      {/* <img className="w-full h-64 object-cover rounded-t-lg" src={product.image} alt={product.name} /> */}

      {/* Product Info */}
      <div className="p-6 bg-black rounded-b-lg">
        {/* Product Name */}
        <h3 className="text-2xl font-bold text-white mb-2 hover:text-orange-400 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Product Price */}
        <p className="text-xl text-pink-300 font-semibold mb-4">{`$${product.price}`}</p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          disabled={isInCart}
          className={`py-2 px-4 rounded-full transition-colors duration-300 
            ${isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
