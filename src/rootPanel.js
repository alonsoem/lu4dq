import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";



import UploadBis from "./upload2.js";
import Activities from "./confirmedQso.js";
import AllActivities from "./activities.js";
import QsoUpload from "./qsoUpload.js";
import Landing from "./landing.js";
import Qso from "./qso.js";
import QsoList from "./qsoList.js";
import NavMenu from "./nav.js";
import AdminView from "./adminView.js";
import AdminABM from "./adminABM.js";
import Checker from "./checker.js";
import CheckerCompare from "./checkerCompare.js";
import Admin from "./admin.js";
import ActivityEdit from "./activityEdit.js";
import AdminDoc from "./docAdmin.js";





//import '../node_modules/bootstrap-css-only/css/bootstrap.css';



export default class App extends React.Component {
    render() {
      return (
        
        <BrowserRouter >
        <NavMenu />
          <Routes>
            
          <Route exact path="/" element={<Landing />}></Route>
          
          <Route exact path='/cargaMasiva' element={<UploadBis />}></Route>
          <Route exact path='/cargaManual' element={<QsoUpload />}></Route>

          <Route exact path='/qsoList/:station' element={<QsoList />}></Route>   
          <Route exact path='/qsoList' element={<QsoList />}></Route>   


          <Route exact path='/checker/:station/:toCallsign' element={<CheckerCompare />}></Route>   
          <Route exact path='/checker/:station' element={<Checker />}></Route>   
          <Route exact path='/checker' element={<Checker />}></Route>   


          <Route exact path='/activities' element={<AllActivities />}></Route>   

          <Route exact path='/qsoTest' element={<Qso />}></Route>   
          
          <Route path='/activities/:idAct' element={<Activities />}></Route>   
          
          <Route path="/:stationCode" element={<Landing />}></Route>
          <Route path="/cargaMasiva/:stationCode" element={<UploadBis />}></Route>
          <Route path="/cargaManual/:stationCode" element={<QsoUpload />}></Route>
          
          
          
          <Route exact path='/status/blabla' element={<AdminView />}></Route>  
          <Route exact path='/status/admin/docABM' element={<AdminDoc />}></Route>  
          <Route exact path='/status/admin/ABM' element={<AdminABM />}></Route>  
          <Route exact path='/status/admin/editActivity/:id' element={<ActivityEdit />}></Route>  
          <Route exact path='/status/admin' element={<Admin />}></Route>  
          
          
            
          </Routes>
        </BrowserRouter>
      );
    }
  }