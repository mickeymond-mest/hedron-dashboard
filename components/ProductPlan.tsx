import { useState } from "react";
import { NextComponentType } from "next";
import { Tile, Button, TextInput, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "carbon-components-react";

type ProductPlanProps = {
  onChange: Function;
  isDisabled?: boolean;
}

const ProductPlan: NextComponentType<any, any, ProductPlanProps> = (props) => {
  const [plans, setPlans] =  useState([]);
  const [name, setName] =  useState('');
  const [price, setPrice] =  useState('');
  const [description, setDescription] =  useState('');

  return (
    <Tile>
      <DataTable
        rows={(plans.map((val, i) => ({ ...val, id: `${i}` })))}
        headers={[
          { header: "Name", key: "name" },
          { header: "Price", key: "price" },
          { header: "Description", key: "description" },
        ]}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="Product Values">
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow
                    key={row.id}
                    onClick={e => {
                      const newValues = plans.filter((val, i) => `${i}` !== row.id);
                      props.onChange(newValues);
                      setPlans(newValues);
                    }}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>)}
      /><br />

      <Button
        className="add-btn"
        disabled={!name || !price || !description}
        onClick={(e) => {
          const newPlans = [...plans, { name, price, description }];
          props.onChange(newPlans);
          setPlans(newPlans);
          setName('');
          setPrice('');
          setDescription('');
        }}
      >Add</Button>
      <div className="clear-float"></div>

      <TextInput
        id="plan-name"
        labelText="Name"
        value={name}
        disabled={props.isDisabled}
        onChange={e => {
          setName(e.target.value);
        }}
      /><br />

      <TextInput
        id="plan-price"
        labelText="Price"
        value={price}
        min={0}
        onChange={e => {
          setPrice(e.target.value);
        }}
      /><br />

      <TextInput
        id="plan-description"
        labelText="Description"
        value={description}
        disabled={props.isDisabled}
        onChange={e => {
          setDescription(e.target.value);
        }}
      />
    </Tile>
  );
}

export default ProductPlan;