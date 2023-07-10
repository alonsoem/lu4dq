import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Qso from "./qso.js";
import UploadBis from "./upload2.js";
import Activities from "./confirmedQso.js";





//import '../node_modules/bootstrap-css-only/css/bootstrap.css';



export default class App extends React.Component {
    render() {
      return (
        <BrowserRouter >
          <Routes>
          <Route path='/activities/:idAct' element={<Activities />}></Route>   
          <Route exact path='/back' element={<UploadBis />}></Route>
          
            <Route exact path="/" element={<Qso />}></Route>
            
          </Routes>
        </BrowserRouter>
      );
    }
  }