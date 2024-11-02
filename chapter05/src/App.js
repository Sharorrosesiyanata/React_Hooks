import React from 'react';
import Products from './Products';
import Rating from './Rating'; 
import { Button } from 'react-bootstrap';
import JumbotronComponent from './JumbotronComponent'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

 function App() {
return ( 
  <div> 
  {/* <Products />  */}  
  <JumbotronComponent>         
This is a long sentence, and I want to insert content into the  
jumbotron component from the outside. 
</JumbotronComponent> 
  </div>
  );
}

export default App;
