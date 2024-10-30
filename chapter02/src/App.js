import React from "react";
import Products from "./Products";

// function formatName(user) {
//   return user.firstName + ' ' + user.lastName;
// }

function App() {
  // const user = {
  //   firstName: "Sharon",
  //   lastName: "Siyanata",
  //   imageUrl:'https://picsum.photos/200/300'
  // };

  return (
    <div>
      {/* <h1>Learn React Hooks</h1> */}
      <Products />
      {/* Hi there, {formatName(user)}!
      <br />
      <img src={user.imageUrl}></img> */}
    </div>
  );
}

export default App;