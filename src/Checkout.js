import React from "react";
import { Card, Table } from "react-bootstrap";

function Checkout(props) {
  return (
    <div>
      <h2>Here are your items:</h2>
      <Card>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{Object.keys(item)[0]}</td>
                <td>{Object.values(item)[0]}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">Number of items:</td>
              <td>
                {props.items.reduce((sum, curItem) => sum + Object.values(curItem)[0], 0)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default Checkout;
