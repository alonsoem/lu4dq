import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Qso from "./qso.js";
import FileUploadSingle from "./upload.js";


//import '../node_modules/bootstrap-css-only/css/bootstrap.css';



export default class App extends React.Component {
    render() {
      return (
        <BrowserRouter basename="/">
          <Routes>
            
            
            
            <Route path="/" element={<Qso />}></Route>
            <Route path="/back" element={<FileUploadSingle />}></Route>
          </Routes>
        </BrowserRouter>
      );
    }
  }