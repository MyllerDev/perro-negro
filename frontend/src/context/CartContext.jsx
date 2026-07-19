import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("perroNegroCart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "perroNegroCart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          const newQuantity = Math.min(
            Math.max(quantity, 0),
            item.stock
          );

          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = useMemo(() => {
    return cartItems.reduce(
      (accumulator, item) => {
        const price = item.discount
          ? item.price -
            (item.price * item.discount) / 100
          : item.price;

        return accumulator + price * item.quantity;
      },
      0
    );
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (accumulator, item) =>
        accumulator + item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return context;
}