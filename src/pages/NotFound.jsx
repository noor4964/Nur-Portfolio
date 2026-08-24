import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found", "The page you're looking for doesn't exist.");

  return (
    <div className="page notfound container">
      <div className="code" aria-hidden="true">
        404
      </div>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn-primary">
        Back to home →
      </Link>
    </div>
  );
}
