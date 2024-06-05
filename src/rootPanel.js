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
import AdminView from "./admin/adminView.js";
import AdminABM from "./admin/activity/adminABM.js";
import Checker from "./checker.js";
import CheckerCompare from "./admin/checkerCompare.js";
import Admin from "./admin/activity/admin.js";
import ActivityEdit from "./admin/activity/activityEdit.js";
import AdminDoc from "./admin/document/docAdmin.js";
import NewDoc from "./admin/document/docAlta.js";
import EditDoc from "./admin/document/docEdit.js";





//import '../node_modules/bootstrap-css-only/css/bootstrap.css';



export default class App extends React.Component {
    render() {
      return (
        
        <BrowserRouter  >
        <NavMenu />
          <Routes>
            
          <Route exact path="/" element={<Landing />}></Route>
          
          <Route exact path='/cargaMasiva' element={<UploadBis />}></Route>
          <Route exact path='/cargaManual' element={<QsoUpload />}></Route>

          <Route exact path='/qsoList/:station' element={<QsoList />}></Route>   
          <Route exact path='/qsoList' element={<QsoList />}></Route>   


          


          <Route exact path='/activities' element={<AllActivities />}></Route>   

          <Route exact path='/qsoTest' element={<Qso />}></Route>   
          
          <Route path='/activities/:idAct' element={<Activities />}></Route>   
          
          <Route path="/:stationCode" element={<Landing />}></Route>
          <Route path="/cargaMasiva/:stationCode" element={<UploadBis />}></Route>
          <Route path="/cargaManual/:stationCode" element={<QsoUpload />}></Route>
          
          
          
          <Route exact path='/status/checker/:station/:toCallsign' element={<CheckerCompare />}></Route>   
          <Route exact path='/status/checker/:station' element={<Checker />}></Route>   
          <Route exact path='/status/checker' element={<Checker />}></Route>   
          <Route exact path='/status/blabla' element={<AdminView />}></Route>  

          
          <Route exact path='/status/admin/doc' element={<AdminDoc />}></Route>  
          <Route exact path='/status/admin/doc/new' element={<NewDoc />}></Route>  
          <Route exact path='/status/admin/doc/:id' element={<EditDoc />}></Route>  

          <Route exact path='/status/admin/ABM' element={<AdminABM />}></Route>  
          <Route exact path='/status/admin/editActivity/:id' element={<ActivityEdit />}></Route>  
          <Route exact path='/status/admin' element={<Admin />}></Route>  
          
          
            
          </Routes>
        </BrowserRouter>
      );
    }
  }
