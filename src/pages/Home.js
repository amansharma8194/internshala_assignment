import { Link } from 'react-router-dom';
import categories from '../components/categories.json';

const Home = () => {
  return (
    <div className="Category-container">
      {categories.map(Category => {
        return (
          <Link key={Category.id} to={`/category/${Category.id}`}>
            <div className="category">
              <h3>{Category.name}</h3>
              <small className="category-text">{Category.description}</small>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
