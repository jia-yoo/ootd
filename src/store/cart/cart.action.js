import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const setAddItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction (CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setRemoveItemInCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction (CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const setDeleteItemFromCart = (cartItems, productToDelete) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return createAction (CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
