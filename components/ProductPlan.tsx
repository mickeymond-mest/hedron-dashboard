import { useState, FunctionComponent } from "react";

type ProductPlanProps = {
  onChange: Function;
  isDisabled?: boolean;
}

const ProductPlan: FunctionComponent<ProductPlanProps> = (props) => {
  const [plans, setPlans] =  useState([]);
  const [name, setName] =  useState('');
  const [price, setPrice] =  useState('');
  const [description, setDescription] =  useState('');

  return (
    <div className="field">
      <button
        className="button is-info is-pulled-right"
        disabled={!name || !price || !description}
        onClick={(e) => {
          const newPlans = [...plans, { name, price, description }];
          props.onChange(newPlans);
          setPlans(newPlans);
          setName('');
          setPrice('');
          setDescription('');
        }}
      >Add</button>
      <label className="label is-clearfix">Plans</label>
      <div className="columns is-marginless">
        <div className="column">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Name"
                value={name}
                disabled={props.isDisabled}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Price"
                value={price}
                disabled={props.isDisabled}
                onChange={e => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Description"
                value={description}
                disabled={props.isDisabled}
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="tile">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, i) => (
              <tr key={i}>
                <td>{plan.name}</td>
                <td>{plan.price}</td>
                <td>{plan.description}</td>
                <td><i
                  className="material-icons has-text-danger"
                  onClick={(e) => {
                    const newPlans = plans.filter((value, pos) => pos !== i);
                    props.onChange(newPlans);
                    setPlans(newPlans);
                  }}
                >close</i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductPlan;