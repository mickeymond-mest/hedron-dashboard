import { FunctionComponent } from "react";
import { ProductType } from "../utils/interfaces";
import Link from "next/link";

type ProductCardItemProps = {
  hasVendorActions: boolean;
  product: ProductType;
  onArchive?: Function;
  onRestore?: Function;
  onStatusChange?: Function;
}



const ProductCardItem: FunctionComponent<ProductCardItemProps> = (
  { product, onArchive, onRestore, hasVendorActions, onStatusChange }
) => {
  const getSelectClasses = () => {
    switch (product.status) {
      case 'pending':
        return "status has-text-info";
      case 'approved':
        return "status has-text-success";
      case 'denied':
        return "status has-text-danger";
      default:
        return 'status';
    }
  }

  const renderStatus = () => {
    if (hasVendorActions) {
      switch (product.status) {
        case 'pending':
          return (
            <button
              className="button has-text-white has-background-info is-small is-rounded"
            >PENDING</button>
          );
        case 'approved':
          return (
            <button
              className="button has-text-white has-background-success is-small is-rounded"
            >APPROVED</button>
          );
        case 'denied':
          return (
            <button
              className="button has-text-white has-background-danger is-small is-rounded"
            >DENIED</button>
          );
        default:
          return '';
      }
    }

    return '';
  }

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
              <p className="title is-6">{product.name}</p>
              {renderStatus()}
            </div>
          </div>
        </div>
        {hasVendorActions ?
          <footer className="card-footer">
            {
              product.archived ?
                <a
                  className="card-footer-item has-text-success"
                  onClick={e => {
                    onRestore(product._id);
                  }}
                >Restore</a> :
                <a
                  className="card-footer-item has-text-danger"
                  onClick={e => {
                    onArchive(product._id);
                  }}
                >Archive</a>
            }
            <Link href={`/vendors/products/edit?_id=${product._id}`}>
              <a className="card-footer-item has-text-info">Edit</a>
            </Link>
          </footer> :
          <footer className="card-footer">
            <div className="card-footer-item">
              <div className="select is-fullwidth is-rounded">
                <select
                  className={getSelectClasses()}
                  value={product.status}
                  onChange={e => {
                    onStatusChange(product._id, e.target.value);
                  }}
                >
                  <option className="has-text-info" value="pending">PENDING</option>
                  <option className="has-text-success" value="approved">APPROVED</option>
                  <option className="has-text-danger" value="denied">DENIED</option>
                </select>
              </div>
            </div>
          </footer>
        }
      </div>
    </div>
  );
}

export default ProductCardItem;