import React from 'react';
import {postQSO, getQsl} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Row, Form} from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default class Qso extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datePick:"2023-06-28",
            timePick:"18:19",
            signal:"lu1eqe",
            frequency:"7100",


            formState:false,
            
            rst:"",
            mode:"",
            band:"",
            error:"",
            //datePick:new Date(),
            
            qsl:null,
            errors:[],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFrecuency = this.handleChangeFrecuency.bind(this);
        this.handleChangeSignal = this.handleChangeSignal.bind(this);
        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var errors = [];

        // Check name of Rule
        if (this.state.signal.length<=3) {
            errors.push("signal");
        }

        // Check description of Rule
        if (this.state.frequency.length <= 3) {
            errors.push("frequency");
        }


        if (this.state.datePick.length !== 10) {
            errors.push("date");
        }


        this.setState({
            errors: errors,
        });

        if (errors.length > 0) {
            return false;
        } else {
            this.submit();
        }
    }

    
      handleChangeFrecuency  = (event) => {
        this.setState({ frequency: event.target.value });
      };

      handleChangeSignal  = (event) => {
        this.setState({ signal: event.target.value });
      };

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }


    submit = () =>{


        
        
        postQSO({
            signal: this.state.signal,
            freq:this.state.frequency,
            date:this.state.datePick.replace(/\D/g, ""),
            time:this.state.timePick.replace(/\D/g, ""),
            micall:this.state.myCall,
            sucall:this.state.toCall,
            banda:this.state.band,
            modo:this.state.mode,
            rst:this.state.rst
        })       
            .then((response) => {
                
                //eslint-disable-next-line
                if (response.response=="OK"){
                    this.notify("CONTACTO CONFIRMADO");
                    //this.tryQsl(response.document);
                    this.setState({formState:false});
                    this.setState({qsl:"http://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+response.document+"&chk="+response.chk});
                    
                }else{
                    this.handleAPIError(response);
                }
                
              console.log("PASO");
              console.log(response);
              
            })
            .catch((response) => this.handleAxiosError(response));
    
      }

      handleAPIError(response) {
        let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
    console.log(response);
    // eslint-disable-next-line
        if (response.response=="Not Confirmed" ) {
          errorToDisplay = "NO SE PUDO CONFIRMAR EL QSO, VERIFIQUE LOS DATOS.";
        }
    
        this.setState({ error: errorToDisplay });
        this.notifyError(errorToDisplay);
      }
      handleAxiosError(response) {
        let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
    
        // eslint-disable-next-line
        if (response.message=="Network Error") {
          errorToDisplay = "Error de red!. Reintente a la brevedad";
        }
    
        this.setState({ error: errorToDisplay });
        this.notifyError(errorToDisplay);
      }

      tryQsl(str){
        getQsl({qso:str})
        .then((response)=>this.setState({qsl:response}))
        .catch((responseError) => this.handleAPIError(responseError));
      }

      notify = (message) => {
        toast.success(message, {
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

     handleChangeDate = (event) => {
        this.setState({datePick:event.target.value});
      };
      handleChangeDatePick = (value) => {
        this.setState({datePick:value});
      };
     handleChangeTime = (event) => {
        this.setState({timePick:event.target.value});
      };

      handleChangeTimePick = (value) => {
        console.log(value);
        this.setState({timePick:value});
      };

     handleChangeRst = (event) => {
        this.setState({rst:event.target.value});
      };

     handleChangeProp = (event) => {
        this.setState({prop:event.target.value});
      };
      handleChangeToCall= (event) => {
        this.setState({signal:event.target.value});
      };            

      handleChangeMode= (event) => {
        this.setState({mode:event.target.value});
      };            

      handleChangeBand= (event) => {
        this.setState({band:event.target.value});
      };        
      handleChangeFreq= (event) => {
        this.setState({frequency:event.target.value});
      };     
      resetForm=()=>{
        
        this.setState({formState:true,signal:"",frequency:"",datePick:"2023-01-01",time:"12:00"});
      }
      
      
    componentDidMount() {
               
    }


       
    render() {

        function FormRequest(props){
           return  <div>
                    <div className="row rowForm">
                                    <div className="col-12">
                                    <h1>Ingresa los datos de tu Qso para confirmar el mismo en linea y descarga la QSL o certificado!</h1>
                                    </div>
                                </div>

                                <div className="row">&nbsp;</div>


                             
                                
                                <div className="row">&nbsp;</div>

                
                                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="dateValue">
                      <Form.Label>FECHA NUEVA</Form.Label>
                      <Form.Control  onChange={(e) => props.handleChangeDatePick(e.target.value)} value={props.state.datePick} type="date" 
                                     className={
                                        props.function("date")
                                             ? "form-control is-invalid"
                                             : "form-control"
                                     }/>
                        <div
                            className={
                                props.function("date")
                                    ? "invalid-feedback"
                                    : "visually-hidden"
                            }
                        >
                         Indicar una fecha correcta
                        </div>
  
                    </Form.Group>
                  </Row>


                                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="timeValue">
                      <Form.Label>HORA</Form.Label>
                      <Form.Control  onChange={props.handleChangeTime} value={props.state.timePick} type="time"
                                     className={
                                        props.function("time")
                                             ? "form-control is-invalid"
                                             : "form-control"
                                     }/>
                        <div
                            className={
                                props.function("time")
                                    ? "invalid-feedback"
                                    : "visually-hidden"
                            }
                        >
                         Indicar un horario correcto
                        </div>
  
                    </Form.Group>
                  </Row>

        
                   
                                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="frequencyValue">
                      <Form.Label>FRECUENCIA</Form.Label>
                      <Form.Control  onChange={props.handleChangeFrecuency} value={props.state.frequency}
                                     className={
                                        props.function("frequency")
                                             ? "form-control is-invalid"
                                             : "form-control"
                                     }/>
                        <div
                            className={
                                props.function("frequency")
                                    ? "invalid-feedback"
                                    : "visually-hidden"
                            }
                        >
                         Indicar una frecuencia válida
                        </div>
  
                    </Form.Group>
                  </Row>
                                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="signalValue">
                      <Form.Label>INDICATIVO</Form.Label>
                      <Form.Control  onChange={props.handleChangeSignal} value={props.state.signal}
                                     className={
                                        props.function("signal")
                                             ? "form-control is-invalid"
                                             : "form-control"
                                     }/>
                        <div
                            className={
                                props.function("signal")
                                    ? "invalid-feedback"
                                    : "visually-hidden"
                            }
                        >
                         Escribir al menos 3 digitos de un indicativo válido
                        </div>
  
                    </Form.Group>
                  </Row>

                                
                            
                                <div className="row">&nbsp;</div>
    
                                <div className="row">
                                    <div className="col-12 text-right">
                                            <button type="submit" className="btn btn-success">Confirmar</button>
                                    </div>
                                </div>
                </div>
        }
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
                return <FormRequest state={props.state} function={props.function} handleChangeFrecuency={props.handleChangeFrecuency} 
                handleChangeTime={props.handleChangeTime}
                handleChangeDatePick= {props.handleChangeDatePick}
                handleChangeSignal={props.handleChangeSignal} />;
                
            };
        }
      
        return (
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid table-scroll-vertical gap-3">
                <ToastContainer />

            
                <p>&nbsp;</p>
                    <div style={{ 'height': '100%'}} className="container col-10">
                        
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        <form onSubmit={this.handleSubmit} className="row g-3 needs-validation">
                        
                            <div className="card-body" >
                             

                             <ConditionalForm state={this.state} function={this.hasError}
                             handleChangeFrecuency={this.handleChangeFrecuency} 
                             handleChangeTime={this.handleChangeTime}
                             handleChangeDatePick= {this.handleChangeDatePick}
                             handleChangeSignal={this.handleChangeSignal}
                             resetForm={this.resetForm}
                             />
                             </div>
                            </form>
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
