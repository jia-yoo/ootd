import { createContext, useState, useEffect } from "react";

const deleteCartItem = (cartItems, productToDelete) => {
  //check if the item matches productToremove
  const existingItemInCart = cartItems.find(
    (item) => item.id === productToDelete.id
  );
  if (!existingItemInCart) return;
  return cartItems.filter((item) => item.id !== productToDelete.id);
};
const removeCartItem = (cartItems, productToRemove) => {
  //check if the item matches productToremove
  const existingItemInCart = cartItems.find(
    (item) => item.id === productToRemove.id
  );
  //if does, check if the quantity is equal to 1, if it is remove that item from the cart
  if (existingItemInCart.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }
  // return back cartItems with matching cart item with reduced quantity
  return cartItems.map((item) =>
    item.id === existingItemInCart.id
      ? { ...item, quantity: existingItemInCart.quantity - 1 }
      : item
  );
};
const addCartItem = (cartItems, productToAdd) => {
  //find if item contains productToAdd
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  //If found, increment quantity
  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  // return new array with modified item/new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemInCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, item) => total + item.quantity *item.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemInCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const deleteItemInCart = (productToDelete) => { 
    setCartItems(deleteCartItem(cartItems, productToDelete));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemInCart,
    deleteItemInCart,
    cartCount,
    cartTotal
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
