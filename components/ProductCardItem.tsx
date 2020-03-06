import { FunctionComponent } from "react";
import { ProductType } from "../utils/interfaces";


const ProductCardItem: FunctionComponent<{ product: ProductType }> = ({ product }) => {
  return (
    <div className="column is-one-quarter">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={product.featured.url} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4 trimmed-content">{product.name}</p>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <a className="card-footer-item">Save</a>
          <a className="card-footer-item">Edit</a>
          <a className="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>
  );
}

export default ProductCardItem;