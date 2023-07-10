import { useDispatch, useSelector } from "react-redux";

import { setAddItemToCart, setDeleteItemFromCart, setRemoveItemInCart } from "../../store/cart/cart.action.js";
import { selectCartItems } from "../../store/cart/cart.selector.js";

import { CheckoutItemContainer, ImageContainer, RemoveButton, Name, Price, Quantity} from "./checkout-item.styles.jsx";


const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  const dispatch = useDispatch()
const cartItems = useSelector(selectCartItems)
 

  const addItemHandler = () => dispatch(setAddItemToCart(cartItems, item));
  const deleteItemHandler = () => dispatch(setDeleteItemFromCart(cartItems, item));
  const removeItemHandler = () => dispatch(setRemoveItemInCart(cartItems, item));
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value"> {quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={deleteItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
