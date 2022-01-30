import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../components/Product';
import products from '../components/products.json';
import { useProducts } from '../misc/custom-hooks';

const filtersData = [
  { name: 'Delivery', isChecked: false },
  { name: 'inStock', isChecked: false },
  { name: 'Expensive', isChecked: false },
];
function getFilteredData(name, ProductsData) {
  if (name === 'Delivery') {
    return ProductsData.filter(product => product.delivery === true);
  } else if (name === 'inStock') {
    return ProductsData.filter(product => product.inStock === true);
  } else if (name === 'Expensive') {
    return ProductsData.filter(product => product.price > 100);
  } else {
    return ProductsData.filter(product => product.categoryId === name);
  }
}
const Category = () => {
  const { id } = useParams();
  const [data, setData] = useState(products);
  const [filters, setFilters] = useState(filtersData);
  const [state, dispatch] = useProducts();
  useEffect(() => {
    const filterdData = getFilteredData(id, data);
    setData(filterdData);
  }, []);
  const handleChange = ev => {
    const { name, checked } = ev.target;
    const Data = filters.map(filter =>
      filter.name === name ? { ...filter, isChecked: checked } : filter
    );
    setFilters(Data);
    const filteredProductsData = getFilteredData(name, data);
    setData(filteredProductsData);
  };
  const onCartClick = useCallback((id, price) => {
    dispatch({ type: 'ADD', payload: { ProductId: id, ProductPrice: price } });
  }, []);
  const renderProducts = Data => {
    return Data.map(result => {
      const currentProduct = state.find(
        cartProduct => cartProduct.id === result.id
      );

      return (
        <Product
          key={result.id}
          result={result}
          onCartClick={onCartClick}
          State={currentProduct}
        />
      );
    });
  };
  return (
    <>
      <div className="sidenav">
        <h3>Filter</h3>

        {filters.map(filter => {
          return (
            <div key={filter.name} className="checkbox-container">
              <input
                className="checkbox"
                type="checkbox"
                name={filter.name}
                onChange={e => handleChange(e)}
                value={filter.isChecked}
              />
              <label htmlFor={filter.name}>{filter.name}</label>
            </div>
          );
        })}
      </div>
      <div className="CategoryItem-container">
        {data.length !== 0 ? (
          renderProducts(data)
        ) : (
          <div className="Alert">No items Available</div>
        )}
      </div>
    </>
  );
};

export default Category;
