import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found section">
      <div className="container not-found__container animate-in">
        <h1 className="not-found__title">
          <span className="text-gold">404</span> - Page Not Found
        </h1>
        <p className="not-found__desc">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn--primary not-found__btn">
          Return Home
        </Link>
      </div>
    </div>
  );
}
