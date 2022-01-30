import { useProducts } from '../misc/custom-hooks';
import Products from '../components/products.json';
import { useState } from 'react';

const Cart = () => {
  const [cartProducts, dispatch] = useProducts();
  const [products] = useState(Products);
  const onAddClick = id => {
    dispatch({ type: 'UPDATE', payload: { ProductId: id, operation: 'add' } });
  };

  const onRemoveClick = id => {
    dispatch({
      type: 'UPDATE',
      payload: { ProductId: id, operation: 'remove' },
    });
  };
  const onDeleteClick = id => {
    dispatch({ type: 'REMOVE', payload: { ProductId: id } });
  };
  const cartPrice = cartProducts.reduce(
    (total, item) => total + item.Price * item.count,
    0
  );
  const renderCartProducts = Products => {
    return Products.map(product => {
      const currentProduct = cartProducts.find(
        cartProduct => cartProduct.id === product.id
      );

      if (currentProduct) {
        return (
          <div key={product.id} className="cartProduct">
            <img src={product.thumbnail} alt={product.name} />
            <h3>{product.name}</h3>
            <h3>${product.price}</h3>
            <div className="btn-container">
              <button onClick={() => onRemoveClick(product.id)} className="Btn">
                -
              </button>
              <span className="count">{currentProduct.count}</span>
              <button className="Btn" onClick={() => onAddClick(product.id)}>
                +
              </button>
            </div>

            <button
              onClick={() => onDeleteClick(product.id)}
              className="removeBtn"
            >
              Remove from Cart
            </button>
          </div>
        );
      }
    });
  };
  return (
    <>
      <header className="cart-price wrapper">
        ${cartPrice}
        <p className="tooltip">Total Price</p>
      </header>

      <div className="cartProduct-container">
        {cartProducts.length > 0 ? (
          renderCartProducts(products)
        ) : (
          <div className="Alert">No items are added to cart</div>
        )}
      </div>
    </>
  );
};

export default Cart;
