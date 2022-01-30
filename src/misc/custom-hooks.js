import { useEffect, useReducer } from 'react';

const ProductReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...prevState,
        {
          id: action.payload.ProductId,
          Price: action.payload.ProductPrice,
          count: 1,
        },
      ];
    case 'REMOVE':
      return prevState.filter(
        Product => Product.id !== action.payload.ProductId
      );
    case 'UPDATE':
      return prevState.map(Product => {
        if (Product.id === action.payload.ProductId) {
          return {
            id: Product.id,
            Price: Product.Price,
            count:
              action.payload.operation === 'add'
                ? Product.count + 1
                : Product.count - 1,
          };
        } else {
          return { ...Product };
        }
      });
    default:
      return prevState;
  }
};
function usePersistedReducer(reducer, initailstate, key) {
  const [state, dispatch] = useReducer(reducer, initailstate, initial => {
    const cartProducts = localStorage.getItem(key);
    return cartProducts ? JSON.parse(cartProducts) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}

export function useProducts(key = 'Products') {
  return usePersistedReducer(ProductReducer, [], key);
}
