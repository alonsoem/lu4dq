import React from 'react';
import FormRequest from './formRequest';
import { saveAs } from 'file-saver';
import { getEnabledActivities } from './api/api';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import TimeUp from './timeUp';


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

    componentDidMount=()=>{
        this.setState({isLoading:true});
        getEnabledActivities()       
            .then((response) => {
                this.setState({enabled:response.enabled});
                this.setState({isLoading:false});
                
            })
            .catch((response) => this.handleAxiosError(response));

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

        

        const downloadImage=(url)=>{
            saveAs(url, 'qsl.jpg');
          }
          
          const downloadQsl=(qsl)=>{
            // eslint-disable-next-line
            if (qsl.status=="RC Confirmed"){
                var url = "https://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+qsl.document+"&chk="+qsl.chk;
                return (
                    <h5>Este contacto fue confirmado. 

                       <button className="btn btn-success m-3" onClick={r=>
                               downloadImage(url)}>
                                   Descargar QSL!
                       </button>
                   </h5>
                );
            // eslint-disable-next-line
            }else if (qsl.status=="Confirmed"){
                return (
                    <h5>Este contacto ha sido confirmado.</h5>
                );
            
            }else{
                return "Este contacto NO ha sido confirmado aún";
            }
            
            
          }
       
        function PreviewPanel(props){
            return <div className="container">
                        <div class="col-md-12 text-left">
                            <h3>Tu contacto se cargó con éxito!</h3>

                            <h5>Podrás seguir la confirmación de contactos desde el sitio de la actividad. <a class="btn btn-success m-3" href="/activities/">Ir a las actividades</a></h5>
                        
                            {downloadQsl(props.qsl)}
                        </div>

                                         
                    
                         <button type="button" className="btn btn-primary mt-3" onClick={props.showForm}>Subir otro contacto</button>
                         
                         
                    </div>
                    
        }


        function ConditionalForm(props){

            // eslint-disable-next-line
            if (props.state.formState==false){
                return <PreviewPanel showForm={props.resetForm} qsl={props.state.qsl} showActivities={props.gotoActivities} />;
            }else{
                if (props.state.isLoading){
                    return (            
                        <div class="text-center m-5">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Cargando...</span>
                            </div>
                            <p class="m-2"> Aguarde un instante...</p>
                        </div>
                    );
                
                }else{
                    if (props.state.enabled){
                        return <FormRequest qslHook={props.setQsl} />
                    }else{
                       return <TimeUp />
                        
                    }
                }   
                
            };
        }
   
      
        return (

            
            

                   <div  className="mt-4 " >
                   
                    
                    <div class="container-fluid  ">
                    <div class="row ">
                    <div class="  m-auto  col-lg-10 col-md-10 col-sm-10 col-xs-12 col-12" >
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.6)'}}>
                            <div className="card-header headerLu4dq">
                                <span class="display-6 ">CARGA MANUAL</span>       
                            </div>
                        
                            <div className="card-body" >

                                <ConditionalForm state={this.state} 
                                    resetForm={this.resetForm}
                                        setQsl={this.setQsl}

                                />
                            </div>
                            
                        </div>
                        </div>
                        </div>
                        
                        <ToastContainer />
                        </div>
                    </div>

         
    

        );


    }


}
