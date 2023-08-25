import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";



import UploadBis from "./upload2.js";
import Activities from "./confirmedQso.js";
import AllActivities from "./activities.js";
import QsoUpload from "./qsoUpload.js";
import Landing from "./landing.js";
import Qso from "./qso.js";






//import '../node_modules/bootstrap-css-only/css/bootstrap.css';



export default class App extends React.Component {
    render() {
      return (
        <BrowserRouter >
          <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          
          <Route exact path='/cargaMasiva' element={<UploadBis />}></Route>
          <Route exact path='/cargaManual' element={<QsoUpload />}></Route>

          <Route exact path='/activities' element={<AllActivities />}></Route>   

          <Route exact path='/qsoTest' element={<Qso />}></Route>   
          <Route path='/activities/:idAct' element={<Activities />}></Route>   
          
          <Route path="/:stationCode" element={<Landing />}></Route>
          <Route path="/cargaMasiva/:stationCode" element={<UploadBis />}></Route>
          <Route path="/cargaManual/:stationCode" element={<QsoUpload />}></Route>
          
          
          
            
          </Routes>
        </BrowserRouter>
      );
    }
  }