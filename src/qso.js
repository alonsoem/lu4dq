import React from 'react';
//import '../node_modules/bootstrap-css-only/css/bootstrap.css';
import {postQSO} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default class Qso extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date:"2023/06/06",
            time:"1200",
            signal:"lu1eqe",
            rst:"",
            mode:"",
            band:"",
            frequency:"7100",
            error:"",
            datePick:new Date(),
            timePick:new Date()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.submit();
    }


    submit = () =>{

        postQSO({
            signal: this.state.signal,
            freq:this.state.frequency,
            date:format(this.state.datePick,"yyyyMMdd"),
            time:format(this.state.timePick,"HHmm"),
            

            micall:this.state.myCall,
            sucall:this.state.toCall,
            banda:this.state.band,
            modo:this.state.mode,
            rst:this.state.rst
        })       
            .then((response) => {
                if (response.response==="OK"){
                    this.notify("CONTACTO CONFIRMADO");
                }else{
                    this.handleAPIError(response.response);
                }
              //registro ok a donde voy?
                //this.props.history.push("/");
              console.log("PASO");
              console.log(response);
              //this.notify(this.props.t("userModifiedOK"));
              
            })
            .catch((responseError) => this.handleAPIError(responseError));
    
      }

      handleAPIError(responseError) {
        let errorToDisplay = "MENSAJE GENERICO DE ERROR";
    
        if (responseError.request ) {
          errorToDisplay = "OTRO ERROR";
        }
    
        this.setState({ error: errorToDisplay });
        this.notifyError(errorToDisplay);
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
        this.setState({date:event.target.value});
      };
      handleChangeDatePick = (value) => {
        this.setState({datePick:value});
      };
     handleChangeTime = (event) => {
        this.setState({time:event.target.value});
      };

      handleChangeTimePick = (value) => {
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

      
      
    componentDidMount() {
               
    }
       
    render() {
        return (

            <div >
                 
        
            
                
            
            <div className="card-header bgdiv text-white">
                <h1>QSO's</h1> 
            </div>

            <div className="container-fluid table-scroll-vertical">
            <ToastContainer />

            <p>&nbsp;</p>
            
                    <div style={{'width': '100%', 'height': '100%', 'background-color': 'rgba(0,0,255,0.1)'}}>
                        <div className="card" style={{'background-color':'#439139ef'}}>
                        <form onSubmit={this.handleSubmit} className="row g-3 needs-validation">
                        
                            <div className="card-body " >
                             
                                <div className="row">
                                    <div className="col-12">
                                        Confirme un contacto para obtener una qso o certificado.
                                    </div>
                                </div>

                                <div className="row">&nbsp;</div>
                             
                                
                                <div className="row">&nbsp;</div>

                
                                <div className="row">
                                    <div className="col-2 text-left">Fecha</div>
                                    <div class="col-10 has-validation">    
                                        <DatePicker showIcon selected={this.state.datePick} onChange={(date) => this.handleChangeDatePick(date)}  dateFormat="dd/MM/yyyy" />        
                                        
                                        <div class="invalid-feedback">
                                                La fecha no puede ser vacia!
                                        </div>
                                     </div>
                                </div>
                                <div className="row">
                                <div className="col-2 text-left">Hora</div>
                                    <div class=" col-10 has-validation">    
                                    <DatePicker
      selected={this.state.timePick}
      onChange={(time) => this.handleChangeTimePick(time)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
                                        
                                        <div className="invalid-feedback">
                                                La hora no puede ser vacia!
                                        </div>
                                     </div>
                                </div>
                                
                                <div className="row">
                                <div className="col-2 text-left">Señal</div>
                                    <div className="col-10 text-center">
                                        <input type="text" className="form-control"  id="callsign"  value={this.state.signal} onChange={this.handleChangeToCall} /> 
                                    </div>
                                </div>

                                <div className="row">
                                <div className="col-2 text-left">Frecuencia</div>
                                    <div className="col-10 text-center">
                                    <div className="row">
                                        <div className="col-3 text-center">
                                            <input type="text" className="form-control" id="frequency"  value={this.state.frequency} onChange={this.handleChangeFreq} /> 
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            {/*
                                <div className="row">
                                    <div className="col-2 text-left">Modo</div>

                                    <div className="col-10 text-center">
                                        <select className="form-select" id="mode" required onChange={this.handleChangeMode}>
                                            <option selected disabled value="">Elija un modo...</option>
                                            <option value="cw">CW</option>
                                            <option value="am">AM</option>
                                            <option value="ssb">SSB</option>
                                            <option value="atv">ATV</option>
                                            <option value="sstv">SSTV</option>
                                            <option value="PACKET">PACKET</option>
                                            <option value="APRS">APRS</option>
                                            <option value="RTTY">RTTY</option>
                                            <option value="FM">FM</option>
                                            <option value="FAX">FAX</option>
                                            <option value="DV">DV</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Falta seleccionar un modo!
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-2 text-left">Banda</div>
                                    <div className="col-10 text-center">
    
                                        <select className="form-select" id="band" required onChange={this.handleChangeBand}>
                                            <option selected disabled value="">Elija una banda...</option>
                                            <option value="160m">160 m</option>
                                            <option value="80m">80 m</option>
                                            <option value="60m">60 m</option>
                                            <option value="40m">40 m</option>
                                            <option value="30m">30 m</option>
                                            <option value="20m">20 m</option>
                                            <option value="17m">17 m</option>
                                            <option value="15m">15 m</option>
                                            <option value="12m">12 m</option>
                                            <option value="10m">10 m</option>
                                            <option value="6m">6 m</option>
                                            <option value="2m">2 m</option>
                                            <option value="1.2m">1,2 m</option>
                                            <option value="70cm">70 cm</option>
                                            <option value="VOIP">VOIP</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Falta seleccionar una banda!
                                        </div>
                                    </div>
                                </div>
   

                                <div className="row">
                                <div className="col-2 text-left">RST</div>
                                    <div className="col-10 text-center">
                                    <div className="row">
                                        <div className="col-3 text-center">
                                            <input type="text" className="form-control" id="rst"  value={this.state.rst} onChange={this.handleChangeRst} /> 
                                        </div>

                                        </div>
                                    </div>
                                </div>


                                
                                <div className="row">
                                    <div className="col-2 text-left">Mensaje</div>
                                     <div className="col-10 text-center">
                                     <div class="input-group has-validation">    
                                        
                                        <input type="text" className="form-control" style={{ 'width': '100% !important'}} id="message" aria-describedby="inputGroupPrepend" required value={this.state.message} onChange={this.handleChangeMessage} />
                                        <div className="invalid-feedback">
                                                El mensaje no puede ser vacio!
                                        </div>
                                     </div>
                                        
                                    </div>
                                </div>
        */}
                                <div className="row">&nbsp;</div>
    
                                <div className="row">
                                    <div className="col-12 text-right">
                                            <button type="submit" className="btn btn-light">Registrar!</button>
                                    </div>
                                </div>

                                
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
