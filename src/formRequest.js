//import "./styles.css";
import {Form, Row} from "react-bootstrap";
import { useState } from "react";
import {postQSO, getQsl} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';


export default function FormRequest(props) {

  
  const [datePick, setDate] = useState("2023-06-28");
  const [timePick, setTime] = useState("18:19");
  const [frequency, setFrequency] = useState("7100");
  const [signal, setSignal] = useState("lu1eqe");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  
            
          
  
  const handleChangeDatePick = (value) => {
    setDate(value);
  };
 
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleChangeFrecuency= (event) => {
    setFrequency(event.target.value);
  };     
  const handleChangeSignal  = (event) => {
    setSignal(event.target.value);
  };

  
  const handleAPIError= (response)=> {
    let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";

    // eslint-disable-next-line
    if (response.response=="Not Confirmed" ) {
      errorToDisplay = "NO SE PUDO CONFIRMAR EL QSO, VERIFIQUE LOS DATOS.";
    }

    setError(errorToDisplay);
    notifyError(errorToDisplay);
  }

  const handleAxiosError = (response) => {
    let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";

    // eslint-disable-next-line
    if (response.message=="Network Error") {
      errorToDisplay = "Error de red!. Reintente a la brevedad";
    }

    setError(errorToDisplay);
    notifyError(errorToDisplay);
  }

  const tryQsl = (str) =>{
    getQsl({qso:str})
    .then((response)=>this.setState({qsl:response}))
    .catch((responseError) => this.handleAPIError(responseError));
  }

  const notify = (message) => {
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

    postQSO({
        signal: signal,
        freq:frequency,
        date:datePick.replace(/\D/g, ""),
        time:timePick.replace(/\D/g, ""),
        //micall:this.state.myCall,
        //sucall:this.state.toCall,
        //banda:this.state.band,
        //modo:this.state.mode,
        //rst:this.state.rst
        })       
        .then((response) => {
            //eslint-disable-next-line
            if (response.response=="OK"){
                notify("CONTACTO CONFIRMADO");
                //this.tryQsl(response.document);
                //this.setState({formState:false});
                props.formState=false;
                //this.setState({qsl:"http://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+response.document+"&chk="+response.chk});
                props.qsl="http://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+response.document+"&chk="+response.chk;
                
            }else{
                handleAPIError(response);
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

    // Check description of Rule
    if (frequency.length <= 3) {
        errors.push("frequency");
    }


    if (datePick.length !== 10) {
        errors.push("date");
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
                               <h5>Ingresa los datos de tu Qso para confirmar el mismo en linea y descarga la QSL o certificado!</h5>
                               </div>
                           </div>

                           <div className="row">&nbsp;</div>


                        
                           
                           <div className="row">&nbsp;</div>

           
                           <Row className="mb-3">
               <Form.Group className="mb-3" controlId="dateValue">
                 <Form.Label>FECHA NUEVA</Form.Label>
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
                           <Row className="mb-3">
               <Form.Group className="mb-3" controlId="signalValue">
                 <Form.Label>INDICATIVO</Form.Label>
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
           
    </form>
  
  );
}
