import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';



import NavMenu from './nav.js';
import AnnouncementMod from './announcementMod.js';


export default function  Announcement(props) {
   
    
    return (
            <div>
                <NavMenu />      
                
                <div  className="mt-4 " >                 
                        <div class="container-fluid  ">   
                <AnnouncementMod /> 
                </div>
                                    
                                    
                        
                                    </div>        
            </div>
    

        );

}
