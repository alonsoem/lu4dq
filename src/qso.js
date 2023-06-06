import React from 'react';
//import '../node_modules/bootstrap-css-only/css/bootstrap.css';
import {postQSO} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default class Qso extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date:"2023/05/11",
            time:"19:00",
            myCall:"lu1eqe",
            toCall:"lu1epp",
            rst:"",
            message:"",
            mode:"",
            band:"",
            frequency:"",
            error:"",


        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
    
        this.submit();
    }


    submit = () =>{

        postQSO({
            signal: this.state.user,
            micall:this.state.myCall,
            frequency:this.state.frequency,
            sucall:this.state.toCall,
            banda:this.state.band,
            modo:this.state.mode,
            date:this.state.date,
            time:this.state.time,
            rst:this.state.rst,
            x_qslMSG:this.state.message
        })       
            .then((response) => {
                if (response.response==="OK"){
                    this.notify("CONTACTO CONFIRMADO");
                }else{
                    this.handleAPIError(response.response))
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

     handleChangeTime = (event) => {
        this.setState({time:event.target.value});
      };

     handleChangeRst = (event) => {
        this.setState({rst:event.target.value});
      };



     handleChangeProp = (event) => {
        this.setState({prop:event.target.value});
      };
     handleChangeMessage= (event) => {
        this.setState({message:event.target.value});
      };      

      handleChangeToCall= (event) => {
        this.setState({toCall:event.target.value});
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
                                        Incluya un contacto a Log Argentina
                                    </div>
                                </div>

                                <div className="row">&nbsp;</div>
                             
                                
                                <div className="row">&nbsp;</div>

                                <div className="row">
                                <div className="col-2 text-left">Fecha</div>
                                    <div class="input-group col-10 text-center has-validation">    
                                        <input type="text" className="form-control" style={{ 'width': '100% !important'}} id="date" value={this.state.date} onChange={this.handleChangeDate} required />
                                        <div class="invalid-feedback">
                                                La fecha no puede ser vacia!
                                        </div>
                                     </div>
                                </div>
                                <div className="row">
                                <div className="col-2 text-left">Hora</div>
                                    <div class="input-group col-10 text-center has-validation">    
                                        <input type="text" className="form-control" style={{ 'width': '100% !important'}} id="time" value={this.state.time} onChange={this.handleChangeTime} required />
                                        <div className="invalid-feedback">
                                                La hora no puede ser vacia!
                                        </div>
                                     </div>
                                </div>
                                
                                <div className="row">
                                <div className="col-2 text-left">Callsign</div>
                                    <div className="col-10 text-center">
                                        <input type="text" className="form-control" style={{ 'width': '100% !important'}} id="callsign"  value={this.state.toCall} onChange={this.handleChangeToCall} /> 
                                    </div>
                                </div>

                                <div className="row">
                                <div className="col-2 text-left">Frequency</div>
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
