

const ProductsFilterComponent = () => {
  return (
    <div className="card">
      <div className="card-content hedron-products-filter-bar">
        <div className="select is-rounded">
          <select>
            <option value="">Status</option>
            <option>With options</option>
          </select>
        </div>
        <div className="select is-rounded">
          <select>
            <option>Availability</option>
            <option>With options</option>
          </select>
        </div>
        <div className="select is-rounded">
          <select>
            <option>Features</option>
            <option>With options</option>
          </select>
        </div>
        <div className="select is-rounded">
          <select>
            <option>Pricing</option>
            <option>With options</option>
          </select>
        </div>
        <div className="select is-rounded">
          <select>
            <option>Category</option>
            <option>With options</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProductsFilterComponent;