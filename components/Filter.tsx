import { NextComponentType } from "next";
import { useState } from "react";

type FilterProps = {
  onStatusChange: Function;
}

const Filter: NextComponentType<any, any, FilterProps> = ({ onStatusChange }) => {
  const [status, setStatus] = useState('');

  return (
    <div className="card">
      <div className="card-content hedron-products-filter-bar">
        <div className="select is-rounded">
          <select
            value={status}
            onChange={e => {
              setStatus(e.target.value);
              // onStatusChange(e.target.value);
            }}
          >
            <option className="has-text-info" value="">All Status</option>
            <option className="has-text-warning" value="pending">Pending</option>
            <option className="has-text-success" value="approved">Approved</option>
            <option className="has-text-danger" value="denied">Denied</option>
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

export default Filter;