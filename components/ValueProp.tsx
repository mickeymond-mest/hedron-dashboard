import { useState } from "react";
import { NextComponentType } from "next";

type ValuePropProps = {
  onChange: Function;
  isDisabled?: boolean;
}

const ValueProp: NextComponentType<any, any, ValuePropProps> = (props) => {
  const [values, setValues] =  useState([]);
  const [name, setName] =  useState('');
  const [description, setDescription] =  useState('');

  return (
    <div className="field">
      <button
        className="button is-info is-pulled-right"
        disabled={!name || !description}
        onClick={(e) => {
          const newValues = [...values, { name, description }];
          props.onChange(newValues);
          setValues(newValues);
          setName('');
          setDescription('');
        }}
      >Add</button>
      <label className="label is-clearfix">Value Props</label>
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
      <div className="card">
        <div className="card-content">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {values.map((value, i) => (
              <tr key={i}>
                <td>{value.name}</td>
                <td>{value.description}</td>
                <td><i
                  className="material-icons has-text-danger"
                  onClick={(e) => {
                    const newValues = values.filter((value, pos) => pos !== i);
                    props.onChange(newValues);
                    setValues(newValues);
                  }}
                >close</i></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default ValueProp;