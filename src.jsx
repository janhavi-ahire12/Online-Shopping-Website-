import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const products = [
  { id: 1, name: "T-Shirt", price: 499 },
  { id: 2, name: "Headphones", price: 999 },
  { id: 3, name: "Shoes", price: 1499 }
];

function App() {
  const [page, setPage] = useState("shop");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const addToCart = (product) => {
    setCart((items) => [...items, product]);
    setMessage(`${product.name} added to cart.`);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const visibleProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function submitDemo(event, action) {
    event.preventDefault();
    setMessage(`${action} successful (demo only).`);
  }

  return (
    <main className="container">
      <header>
        <h1>ShopEasy</h1>
        <nav>
          <button onClick={() => { setPage("shop"); setMessage(""); }}>Shop</button>
          <button onClick={() => { setPage("register"); setMessage(""); }}>Register</button>
          <button onClick={() => { setPage("login"); setMessage(""); }}>Login</button>
          <button onClick={() => { setPage("cart"); setMessage(""); }}>Cart ({cart.length})</button>
        </nav>
      </header>

      {page === "shop" && (
        <section>
          <h2>Search Products</h2>
          <input
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="products">
            {visibleProducts.map((product) => (
              <article className="card" key={product.id}>
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </article>
            ))}
            {visibleProducts.length === 0 && <p>No products found.</p>}
          </div>
        </section>
      )}

      {page === "register" && (
        <section>
          <h2>User Registration</h2>
          <form onSubmit={(e) => submitDemo(e, "Registration")}>
            <input placeholder="Full name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required minLength="4" />
            <button type="submit">Register</button>
          </form>
          <p className="hint">Demo form only; details are not saved.</p>
        </section>
      )}

      {page === "login" && (
        <section>
          <h2>User Login</h2>
          <form onSubmit={(e) => submitDemo(e, "Login")}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <p className="hint">Demo form only; no account authentication.</p>
        </section>
      )}

      {page === "cart" && (
        <section>
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? <p>Your cart is empty.</p> : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={`${item.id}-${index}`}>{item.name} — ₹{item.price}</li>
                ))}
              </ul>
              <h3>Total: ₹{total}</h3>
              <button onClick={() => { setCart([]); setMessage("Cart cleared."); }}>Clear Cart</button>
              <button onClick={() => setPage("payment")}>Checkout / Pay</button>
            </>
          )}
        </section>
      )}

      {page === "payment" && (
        <section>
          <h2>Online Payment</h2>
          <p>Order total: <strong>₹{total}</strong></p>
          <p className="hint">This is a simulated payment. No money is charged.</p>
          <button disabled={cart.length === 0} onClick={() => { setMessage("Payment successful (demo only)."); setCart([]); }}>Pay Now</button>
          <button className="secondary" onClick={() => setPage("cart")}>Back to Cart</button>
        </section>
      )}

      {message && <p className="message" role="status">{message}</p>}
      <footer>Minimal Online Shopping System · Practical Demo</footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
