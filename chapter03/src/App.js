import React from "react";
import Products from "./Products";
import { Button } from 'react-bootstrap';
import Rating from './Rating';

function App() {
  //  const isValid = true;
  return (
    <div>
      {/* <Products />
      <Button variant="danger">Default</Button> */}
      <Rating rating='1' />
      <Rating rating='2' />
      <Rating rating='3' />
      <Rating rating='4' />
      <Rating rating='5' />
    </div>
  );
}

export default App;