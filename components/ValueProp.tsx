import { useState } from "react";
import { NextComponentType } from "next";
import { Button, Tile, TextInput, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "carbon-components-react";

type ValuePropProps = {
  onChange: Function;
  isDisabled?: boolean;
}

const ValueProp: NextComponentType<any, any, ValuePropProps> = (props) => {
  const [values, setValues] =  useState([]);
  const [name, setName] =  useState('');
  const [description, setDescription] =  useState('');

  return (
    <Tile>
      <DataTable
        rows={(values.map((val, i) => ({ ...val, id: `${i}` })))}
        headers={[
          { header: "Name", key: "name" },
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
                      const newValues = values.filter((val, i) => `${i}` !== row.id);
                      props.onChange(newValues);
                      setValues(newValues);
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
        disabled={!name || !description}
        onClick={(e) => {
          const newValues = [...values, { name, description }];
          props.onChange(newValues);
          setValues(newValues);
          setName('');
          setDescription('');
        }}
      >Add</Button>
      <div className="clear-float"></div>

      <TextInput
        id="value-name"
        labelText="Name"
        value={name}
        disabled={props.isDisabled}
        onChange={e => {
          setName(e.target.value);
        }}
      /><br />
      <TextInput
        id="value-description"
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

export default ValueProp;