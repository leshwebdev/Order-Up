import React from "react";
import { Card, Table } from "react-bootstrap";

function Basket(props) {
  return (
    <div className="container flex col">
      <h2>Basket:</h2>
      <Card>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Item</th>
              <th colSpan="2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item, index) => (
              <tr key={index}>
                <td>{Object.keys(item)[0]}</td>
                <td>{Object.values(item)[0]}</td>
                <td className="remove" onClick={() => props.onRemoveFromBasket(item)}>x</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default Basket;
