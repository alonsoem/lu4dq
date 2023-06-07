import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Qso from "./qso.js";
import BackOffice from "./upload.js";
import UploadBis from "./upload2.js";


//import '../node_modules/bootstrap-css-only/css/bootstrap.css';



export default class App extends React.Component {
    render() {
      return (
        <BrowserRouter >
          <Routes>
            
          <Route exact path="/back" element={<BackOffice />}></Route>
          <Route exact path="/back2" element={<UploadBis />}></Route>
            
            <Route exact path="/" element={<Qso />}></Route>
            
          </Routes>
        </BrowserRouter>
      );
    }
  }