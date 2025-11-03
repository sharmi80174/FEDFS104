import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [cart, setCart] = useState([]);

  // ✅ Load products & cart from localStorage once on mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ✅ Update input values
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // ✅ Add product to list
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productData.name || !productData.price || !productData.image) {
      alert("Please fill all fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productData.name.trim(),
      price: parseFloat(productData.price),
      image: productData.image.trim(),
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    setProductData({ name: "", price: "", image: "" });
    alert("✅ Product added successfully!");
  };

  // ✅ Delete product
  const handleDeleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
    alert("🗑️ Product deleted successfully!");
  };

  // ✅ Add to cart (avoid duplicates)
  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert(`🛒 ${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <nav className="flex justify-between items-center bg-pink-500 p-4 text-white">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:underline"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/logout")}
            className="hover:underline"
          >
            Logout
          </button>
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-sm">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Add Product Form */}
      <form
        onSubmit={handleAddProduct}
        className="p-6 flex flex-col md:flex-row gap-4 justify-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-auto"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-auto"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image filename or URL"
          value={productData.image}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-auto"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {/* ✅ Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {products.length === 0 ? (
          <p className="text-center col-span-3 text-gray-600">
            No products available. Add one above.
          </p>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
            >
              <img
                src={
                  p.image.startsWith("http")
                    ? p.image
                    : `/images/${p.image}`
                }
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-3 border"
              />
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-gray-600">₹{p.price}</p>
              <div className="mt-2 flex justify-center gap-2">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
