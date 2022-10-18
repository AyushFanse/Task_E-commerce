import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";


import Home from "../Pages/Home/Home";
import Cart from "../Pages/Cart/Cart";
import Error from "../Pages/Error/Error";

const URL = "http://localhost:3001"

function App() {
  return (
    <BrowserRouter>
        <div className="main_container flex jc ac col ">
          <div className="inner_container">
            <Routes>
              <Route exact path="/" element={<Home URL={URL}/>} />
              <Route exact path="/cart" element={<Cart URL={URL} />} />
              <Route exact path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
