import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import { ProductCardContainer, Footer } from "./product-card.styles.jsx";

import Button, { BUTTON_TYPE_CLASS } from "../button/button.components";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const addProductToCart = () => addItemToCart(product);

  const { addItemToCart } = useContext(CartContext);
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASS.inverted}
        onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
