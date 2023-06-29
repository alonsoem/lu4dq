import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import FormRequest from './formRequest';



import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default class Qso extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formState:false,
            qsl:null,//aca va una imagen de precarga
            
                       
        };
                
        
    }

  
     
      resetForm=()=>{
        this.setState({formState:true,signal:"",frequency:"",datePick:"2023-01-01",time:"12:00"});
      }
       
    render() {

       
        function PreviewPanel(props){
            return <div className="container">
                    <div class="col-md-12 text-left">
                        <h3>Encontramos las siguientes tarjetas de confirmación</h3>
                    </div>
                    
                    <div>&nbsp;</div>

                    <div class="col-md-12 text-center">
                        <img src={props.qsl} alt="Qsl" />
                    </div>

                    <div>&nbsp;</div>

                    
                    <div class="col-md-12 text-center">
                            <button type="button" className="btn btn-success" onClick={props.showForm}>Hacer otra consulta </button>
                    </div>
                    
                </div>
        }

        function ConditionalForm(props){
            console.log(props);
            // eslint-disable-next-line
            if (props.state.formState==false){
                return <PreviewPanel qsl={props.state.qsl} showForm={props.resetForm} />;
        
            }else{
                /*return <FormRequest state={props.state} function={props.function} handleChangeFrecuency={props.handleChangeFrecuency} 
                handleChangeTime={props.handleChangeTime}
                handleChangeDatePick= {props.handleChangeDatePick}
                handleChangeSignal={props.handleChangeSignal} />;*/
                return <FormRequest qsl={props.state.qsl} formState={props.state.formState} />
                
            };
        }
      
        return (
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid table-scroll-vertical gap-3">
                

            
                <p>&nbsp;</p>
                    <div style={{ 'height': '100%'}} className="container col-10">
                        
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                            <div className="card-body" >
                             

                             <ConditionalForm state={this.state} function={this.hasError}
                             handleChangeFrecuency={this.handleChangeFrecuency} 
                             handleChangeTime={this.handleChangeTime}
                             handleChangeDatePick= {this.handleChangeDatePick}
                             handleChangeSignal={this.handleChangeSignal}
                             resetForm={this.resetForm}
                             />
                             </div>
                            
                        </div>
                    </div>
                </div>
            
         </div>
        

        );


    }


    /* MENSAJES DE RESPUESTA DE LDA

    Falta Usuario!
Falta Contraseña!
El usuario ‘$usuario’ NO existe en LdA!
Error de Contraseña!
No es un Call ni Alias registrado para ‘$usuario’ en LdA!
Falta su Call!
Falta Call Corresponsal!
Falta Banda!
Banda no admitida en LdA!
Banda mal expresada!
Falta Modo!
Falta Fecha!
Error en el formato de la fecha!
Falta Hora!
Error en el formato de la hora!
Falta RS(T)!
Solo se acepta PROP_MODE: SAT!*/
}
