import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  // State
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      // item.quantity += 1; // esta es otra forma de hacerlo.
      // setCart((prevCart) => [...prevCart]);
      if (cart[itemExist].quantity >= MAX_ITEM) return;
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart((prevCart) => [...prevCart, item]);
    }
  }

  function removeFromCart(guitarId) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== guitarId));
  }

  function decreaseQuantity(id) {
    console.log(id);
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > MIN_ITEM) {
        return { ...guitar, quantity: guitar.quantity - 1 };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function increaseQuantity(id) {
    // esta es una forma
    // const updatedCart = [...cart];
    // const item = updatedCart.find((guitar) => guitar.id === id);
    // item.quantity++;
    // setCart(updatedCart);
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < MAX_ITEM) {
        return { ...guitar, quantity: guitar.quantity + 1 };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        setCart={setCart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
