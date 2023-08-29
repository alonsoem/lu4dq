//import "./styles.css";
import {Form, Row} from "react-bootstrap";
import { useState } from "react";
import { format } from "date-fns";
import {getName, postOneQSO} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";



export default function FormRequest(props) {

  const { stationCode } = useParams();
  const [datePick, setDate] = useState(format(new Date(),"yyyy-MM-dd"));
  const [timePick, setTime] = useState(format(new Date(),"HH:mm"));
  const [signal, setSignal] = useState("");
  const [name, setName] = useState("");
  const [band, setBand] = useState("");
  const [mode, setMode] = useState("");
  const [email, setEmail] = useState("");
  const [rst, setRST] = useState("");
  const [rstReceived, setRSTReceived] = useState("");
  
  const [toCall, setToCall] = useState("");
  const [errors, setErrors] = useState([]);
  

  const handleChangeDatePick = (value) => {
    setDate(value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeSignal  = (event) => {
    setSignal(event.target.value.toUpperCase());
    getName({station:event.target.value})
        .then((response) => {
          setName(response.name);
          
      })
      .catch((response) => handleAxiosError(response));
    
  };
  const handleChangeToCall = (event) => {
    setToCall(event.target.value.toUpperCase());
  };
  
  
  const handleChangeBand  = (event) => {
    setBand(event.target.value.toUpperCase());
  };
  const handleChangeMode  = (event) => {
    setMode(event.target.value.toUpperCase());
  };
  const handleChangeRST  = (event) => {
    setRST(event.target.value);
  };
  const handleChangeRSTReceived  = (event) => {
    setRSTReceived(event.target.value);
  };
  
  /*const handleAPIError= (responseJson)=> {
    let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
    console.log("HANDLEAPIERROR");
    


    //setError(errorToDisplay);
    notifyError(errorToDisplay);
  }
*/
  const handleAxiosError = (response) => {
    let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
    console.log("HANDLEAXIOSERROR");
    console.log(response);
        // eslint-disable-next-line
    if (response.response.data.code==1062 ) {
          errorToDisplay = "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS.";
        }
    // eslint-disable-next-line
    if (response.message=="Network Error") {
      errorToDisplay = "Error de red!. Reintente a la brevedad";
    }

    //setError(errorToDisplay);
    notifyError(errorToDisplay);
  }



 

 const notifyError = (message) => {
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


  const submit = () =>{

    postOneQSO({
        signal: signal,
        date:datePick.replace(/\D/g, ""),
        time:timePick.replace(/\D/g, ""),
        band:band,
        mode:mode,
        rstS:rst,
        rstR:rstReceived,
        name:name,
        toCall:toCall,
        stationCode:stationCode,
        email:email
        
        })       
        .then((response) => {
            //eslint-disable-next-line
            if (response.qsl.status=="Confirmed"){
                var url = "http://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+response.qsl.document+"&chk="+response.qsl.chk;
                props.qslHook(url);
            }else{
                props.qslHook(null);
                console.log(response);
                //handleAPIError(response);
            }         
        })
        .catch((response) => handleAxiosError(response));

  }


  const handleSubmit = (event) => {
    
    event.preventDefault();
    var errors = [];

    
    // Check name of Rule
    if (signal.length<=3) {
        errors.push("signal");
    }


    if (isNaN(rst)){
      errors.push("rst");
    }else{
      if (rst>59 || rst<11 ) {
        errors.push("rst");
      }

    }
    if (isNaN(rstReceived)){
      errors.push("rstReceived");
    }else{
      if (rst>59 || rst<11 ) {
        errors.push("rstReceived");
      }

    }
    if (mode.length===0){
      errors.push("mode");
    }

    if (band.length===0){
      errors.push("band");
    }

    if (datePick.length !== 10) {
        errors.push("date");
    }

    if (name.length < 3) {
      errors.push("name");
    }
    if (toCall.length < 3) {
      errors.push("toCall");
    }

    setErrors(errors);

    if (errors.length > 0) {
        return false;
    } else {
        submit();
    }
  }

   
  const hasError= (key) => {
        return errors.indexOf(key) !== -1;
  }



  return (

       <form onSubmit={handleSubmit} className="row g-3 needs-validation">
           <div>
           <ToastContainer />
               <div className="row rowForm">
                               <div className="col-12">
                               <h5>Ingresa los datos de un comunicado para ser confirmado en linea!</h5>
                               </div>
                           </div>

                           <div className="row">&nbsp;</div>


                        
                           
                           <div className="row">&nbsp;</div>

           
                           <Row className="mb-3">
               <Form.Group className="mb-3" controlId="dateValue">
                 <Form.Label>FECHA</Form.Label>
                 <Form.Control  onChange={(e) => handleChangeDatePick(e.target.value)} value={datePick} type="date" 
                                className={
                                  hasError("date")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }/>
                   <div
                       className={
                        hasError("date")
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
                 <Form.Control  onChange={handleChangeTime} value={timePick} type="time"
                                className={
                                  hasError("time")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }/>
                   <div
                       className={
                           hasError("time")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Indicar un horario correcto
                   </div>

               </Form.Group>
             </Row>

   
              {/*
                           <Row className="mb-3">
               <Form.Group className="mb-3" controlId="frequencyValue">
                 <Form.Label>FRECUENCIA</Form.Label>
                 <Form.Control  onChange={handleChangeFrecuency} value={frequency}
                                className={
                                  hasError("frequency")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }/>
                   <div
                       className={
                        hasError("frequency")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Indicar una frecuencia válida
                   </div>

               </Form.Group>
             </Row>
             */}
  <Row className="mb-3">
               <Form.Group className="mb-3" controlId="bandValue">
                 <Form.Label>BANDA</Form.Label>
                 
                  <select id="band" onChange={handleChangeBand}
                  className={
                    hasError("band")
                          ? "form-select is-invalid"
                          : "form-select"
                  } >
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
                   <div
                       className={
                        hasError("band")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Seleccione una banda válida
                   </div>

               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Form.Group className="mb-3" controlId="modeValue">
                 <Form.Label>MODO</Form.Label>
                 
                 <select id="mode"  onChange={handleChangeMode}
                  className={
                    hasError("mode")
                          ? "form-select is-invalid"
                          : "form-select"
                  } >
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
                   <div
                       className={
                        hasError("mode")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Seleccione un modo válido
                   </div>

               </Form.Group>

               </Row>      

            <Row className="mb-3">
               <Form.Group className="mb-3" controlId="signalValue">
                 <Form.Label>TU SEÑAL DISTINTIVA</Form.Label>
                 <Form.Control  onChange={handleChangeSignal} value={signal}
                                className={
                                  hasError("signal")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }/>
                   <div
                       className={
                        hasError("signal")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Escribir al menos 3 caracteres de un indicativo válido
                   </div>

               </Form.Group>
             </Row>

             <Row className="mb-3">
               <Form.Group className="mb-3" controlId="nameValue">
                 <Form.Label>NOMBRE COMPLETO</Form.Label>
                 <Form.Control  onChange={handleChangeName} value={name}
                                className={
                                  hasError("name")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }/>
                   <div
                       className={
                        hasError("name")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Escribe al menos 3 caracteres de un nombre
                   </div>

               </Form.Group>
             </Row>

            <Row className="mb-3">
               <Form.Group className="mb-3" controlId="toCallValue">
                 <Form.Label>SEÑAL DISTINTIVA CORRESPONSAL</Form.Label>
                 <Form.Control  onChange={handleChangeToCall} value={toCall} 
                                className={
                                  hasError("toCall")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                />
                   <div
                       className={
                        hasError("toCall")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Escribe al menos 3 caracteres de una señal distintiva
                   </div>

               </Form.Group>
             </Row>

                  
                <Row className="mb-3">
               <Form.Group  className="mb-3" controlId="rstValue">
                 <Form.Label>SEÑALES ENTREGADAS</Form.Label>
                 <Form.Control  onChange={handleChangeRST} value={rst}
                                className={
                                  hasError("rst")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }/>
                   <div
                       className={
                        hasError("rst")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Indique las señales correctamente!
                   </div>

               </Form.Group>
             </Row>

             <Row className="mb-3">
               <Form.Group  className="mb-3" controlId="rstReceivedValue">
                 <Form.Label>SEÑALES RECIBIDAS</Form.Label>
                 <Form.Control  onChange={handleChangeRSTReceived} value={rstReceived}
                                className={
                                  hasError("rstReceived")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }/>
                   <div
                       className={
                        hasError("rstReceived")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Indique las señales correctamente!
                   </div>

               </Form.Group>
             </Row>
             <Row className="mb-3">
               <Form.Group className="mb-3" controlId="emailValue">
                 <Form.Label>E-MAIL de CONTACTO</Form.Label>
                 <Form.Control  onChange={handleChangeEmail} value={email} 
                                className={
                                  hasError("email")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                />
                   <div
                       className={
                        hasError("email")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Escribe una dirección de email valida
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
           
    </form>
  
  );
}
