import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'

function App() {
  const [itemToDelete, setItemToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 50
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const [products, setProducts] = useState([])
  const categories = ['all', ...new Set(products.map((p) => p.category))]
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    setLoading(true)
    fetch('https://dummyjson.com/products?limit=194')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  function addToCart(product) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id)
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(productId) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productId)
      if (existing.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId)
      }
      return prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })
  }

  function increaseQuantity(productId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function decreaseQuantity(productId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1}
          : item
      )
    )
  }

  function deleteItem(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !==productId))
    setItemToDelete(null)
  }

  const filteredProducts = selectedCategory === 'all'
  ? products
  : products.filter((p) => p.category === selectedCategory)

const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
const paginatedProducts = filteredProducts.slice(
  (currentPage - 1) * productsPerPage,
  currentPage * productsPerPage
)

return (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-6 relative bg-white shadow-sm px-6 py-4 rounded-lg sticky top-0 z-20">
      <h1 className="text-3xl font-bold">Product Cart App</h1>

      <button
        onClick={() => setShowCart(!showCart)}
        className="relative bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
      >
        🛒 Cart
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {showCart && (
        <div className="absolute top-14 right-0 w-80 bg-white border rounded-lg shadow-lg p-4 z-10">
          <h2 className="font-semibold text-lg mb-2">
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-3 text-sm py-2 border-b last:border-b-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500 text-xs">${item.price} each</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div> 
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-medium">&{(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => setItemToDelete(item)}
                      className="text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v13a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <p className="mt-2 font-semibold text-right">
              Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </p>
          )}
        </div>
      )}
    </div>

    <div className="mb-4">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    {loading ? (
      <p className="text-center text-gray-500">Loading products...</p>
    ) : (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </>
    )}

    {itemToDelete && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
          <p className="mb-4">
            Remove <span className="font-semibold">{itemToDelete.title}</span> from your cart?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setItemToDelete(null)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteItem(itemToDelete.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)
}

export default App