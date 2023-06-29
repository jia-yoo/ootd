import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { CheckoutItemContainer, ImageContainer, RemoveButton, Name, Price, Quantity} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  const { deleteItemInCart, addItemToCart, removeItemInCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(item);
  const deleteItemHandler = () => deleteItemInCart(item);
  const removeItemHandler = () => removeItemInCart(item);
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
