import { CategoryItem } from "../categories/categories.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

const deleteCartItem = (
  cartItems: CartItem[],
  productToDelete: CartItem
): CartItem[] => {
  //check if the item matches productToremove
  const existingItemInCart = cartItems.find(
    (item) => item.id === productToDelete.id
  );
  if (!existingItemInCart) return;
  return cartItems.filter((item) => item.id !== productToDelete.id);
};
const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  //check if the item matches productToremove
  const existingItemInCart = cartItems.find(
    (item) => item.id === productToRemove.id
  );
  //if does, check if the quantity is equal to 1, if it is remove that item from the cart
  if (existingItemInCart && existingItemInCart.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }
  // return back cartItems with matching cart item with reduced quantity
  return cartItems.map((item) =>
    item.id === existingItemInCart.id
      ? { ...item, quantity: existingItemInCart.quantity - 1 }
      : item
  );
};
const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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
export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);
export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const setAddItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const setRemoveItemInCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};
export const setDeleteItemFromCart = (
  cartItems: CartItem[],
  productToDelete: CartItem
) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return setCartItems(newCartItems);
};
