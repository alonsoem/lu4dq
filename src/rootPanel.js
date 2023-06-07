import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Qso from "./qso.js";
import FileUploadSingle from "./upload.js";


//import '../node_modules/bootstrap-css-only/css/bootstrap.css';



export default class App extends React.Component {
    render() {
      return (
        <BrowserRouter >
          <Routes>
            
          <Route path="/back" element={<FileUploadSingle />}></Route>
            
            <Route path="/" element={<Qso />}></Route>
            
          </Routes>
        </BrowserRouter>
      );
    }
  }