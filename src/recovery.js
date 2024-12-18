import React from 'react';
import Form from './formRecovery';
import { ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';



import NavMenu from './nav';


export default function  Recovery(props) {
    const navigate = useNavigate();
    const [formState,setFormState] = useState(true);
  
    const setQsl = ()=>{
        setFormState(false);
    }
    const gotoQsoUpload=()=>{
        navigate('/');    
    }

    function PreviewPanel(props){
        return <div className="container">
                    <div class="col-md-12 text-left">
                        <h3>¡Te enviamos tu código!</h3>
                        <h5>En breve podras verlo a tu direccion de email para que puedas validar los contactos que cargues.</h5>
                    </div>
                     <button type="button" className="btn btn-primary mt-3" onClick={props.gotoQsoForms} >Vamos a cargar contactos!</button>
                     
                     
                </div>
    }

    function ConditionalForm(props){

        // eslint-disable-next-line
        if (formState){
            return <Form qslHook={props.qslHook} />
        }else{
            return <PreviewPanel gotoQsoForms={props.gotoQsoUpload} />
        }
    }   

    
    return (
            <div>
            <NavMenu />
            
                   <div  className="mt-4 " >                 
                    
                    <div class="container-fluid  ">
                    <div class="row ">
                    <div class="  m-auto  col-lg-10 col-md-10 col-sm-10 col-xs-12 col-12" >
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.6)'}}>
                            <div className="card-header headerLu4dq">
                                <span class="display-6 ">RECUPERAR MI CÓDIGO</span>       
                            </div>
                        
                            <div className="card-body" >
                                <ConditionalForm qslHook={setQsl}  gotoQsoUpload={gotoQsoUpload} />
                                
                            </div>
                            
                        </div>
                        </div>
                        </div>
                        
                        <ToastContainer />
                        </div>
                    </div>

         </div>
    

        );


    


}
