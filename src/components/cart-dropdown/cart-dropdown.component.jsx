import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../button/button.components";
import CartItem from "../cart-item/cart-item.components";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems  = useSelector(selectCartItems)
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty </EmptyMessage>
        )}
      </CartItems>

      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
