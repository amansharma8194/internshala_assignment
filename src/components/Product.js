const Product = ({ result, onCartClick, State }) => {
  return (
    <div className="product">
      <img src={result.thumbnail} alt={result.name} />
      <h5>{result.name}</h5>
      <p style={{ margin: '0 1rem' }}>${result.price}</p>
      <p style={{ color: result.inStock ? 'green' : 'red' }}>
        {result.inStock ? 'In Stock' : 'Out of Stock'}
      </p>

      <button
        disabled={!result.inStock || !!State}
        onClick={() => onCartClick(result.id, result.price)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
