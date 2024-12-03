import React from 'react';
import Form from './formRegistration';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


import NavMenu from './nav';


export default class QsoUpload extends  React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            formState:true,
            qsl:null,
            enabled:false,
            isLoading:true,
            
        };            
    }
    



    setQsl=(value)=>{
        this.setState({qsl:value})
        this.setState({formState:false})
    }

    resetForm=()=>{
        this.setState({formState:true});
    }

    gotoActivities=()=>{
        this.setState({formState:true});
    }

    

    notifyError = (message) => {
        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        });
    }

     handleAxiosError = (response) => {
        this.setState({isLoading:false});
        console.log(response);
        let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
        console.log("HANDLEAXIOSERROR");
        
            // eslint-disable-next-line
        if (response.response.data.code==1062 ) {
              errorToDisplay = "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS.";
            }

        // eslint-disable-next-line
        if (response.message=="Network Error") {
          errorToDisplay = "Error de red!. Reintente a la brevedad";
        }
    
        //setError(errorToDisplay);
        this.notifyError(errorToDisplay);
      }


           
    render() {

        

        function PreviewPanel(props){
            return <div className="container">
                        <div class="col-md-12 text-left">
                            <h3>Tu contacto se cargó con éxito!</h3>

                            <h5>Podrás seguir la confirmación de contactos desde el sitio de la actividad. <a class="btn btn-success m-3" href="/activities/">Ir a las actividades</a></h5>
                        
                            
                        </div>

                                         
                    
                         <button type="button" className="btn btn-primary mt-3" onClick={props.showForm}>Subir otro contacto</button>
                         
                         
                    </div>
                    
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
                                <span class="display-6 ">REGISTRACIÓN</span>       
                            </div>
                        
                            <div className="card-body" >
                                <Form qslHook={this.setQsl} />
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


}
