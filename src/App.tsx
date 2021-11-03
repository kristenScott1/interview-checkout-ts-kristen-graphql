import React, { useState, useEffect } from 'react';
import './App.css';

function formatCentsToDollars(cents: number): string {
  if (cents < 10) {
    return `$0.0${cents}`;
  }

  let d = (cents / 100) >> 0;
  let c = cents % 100;

  return `$${d}.${c}`;
};

function App() {
  const placeholderProduct = {
    id: 0,
    imageSrc: "/images/loading.svg",
    name: "Loading...",
    priceCents: 0,
  }
  const [products, setProducts] = useState([placeholderProduct]);

  function loadProducts() {
    const request = fetch(
      "https://secret-shore-94903.herokuapp.com/api/v1/products.json",
      {
        headers: {
        },
      }
    );

    request
      .then(response => response.json())
      .then(data => setProducts(data["data"]))
  }

  useEffect(loadProducts, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul className="App-nav">
          <li><a href="/">Product catalog</a></li>
          <li>
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="App-nav-cart-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </a>
            {" "}
            <a href="/">No items in cart | Total: $0.00</a>
          </li>
        </ul>
      </header>
      <div className="App-main">
        <div className="App-product-catalog">
          {products.map((product) =>
            <div className="App-product" key={product["id"]}>
              <div className="App-product-icon"><img src={`https://secret-shore-94903.herokuapp.com${product["imageSrc"]}`} alt="" /></div>
              <div className="App-product-info">
                <h1 className="App-product-name">{product["name"]}</h1>
                {formatCentsToDollars(product["priceCents"])}
              </div>
              <div className="App-product-cart">
                <button>Add to cart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
