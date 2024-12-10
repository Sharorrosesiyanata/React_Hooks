import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import RegistrationForm from "./components/RegisterationForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
   <Route path="/registrations" element={<><RegistrationForm /></>} />
      </Routes>
    </Router>
  );
};

export default App;


//npx create-react-app chapter09
//npm install react-bootstrap bootstrap
// npm install react-bootstrap@1.6.7 bootstrap