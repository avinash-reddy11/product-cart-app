function ProductCard({ product, onAddToCart }) {
  return (
    <div className="relative border rounded-lg p-4 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col bg-white">
      {product.discountPercentage > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="mt-2 font-semibold text-lg line-clamp-1">{product.title}</h2>

      <div className="flex items-center gap-1 text-sm text-yellow-500 mt-1">
        ⭐ {product.rating}
      </div>

      <p className="text-gray-800 font-semibold mt-1">${product.price}</p>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-auto pt-2 bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard