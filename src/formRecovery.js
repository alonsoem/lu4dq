//import "./styles.css";
import {Form, Row} from "react-bootstrap";
import { useState } from "react";
import {checkName, putRecoveryOnQueue} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';

export default function FormRequest(props) {
  const [signal, setSignal] = useState("");
  
  const [errors, setErrors] = useState([]);
  const [formEnabled,setFormEnabled]= useState(false);
  

const handleChangeSignal  = (event) => {
  updateFromCallsign(event.target.value.trim());
}; 

const updateFromCallsign= (callsign)=>{
  setSignal(callsign.toUpperCase());
  var errors=[];
  
  checkName({station:callsign})
      .then((response) => {
          //si existe una estacion con ese dato
          console.log(response);
          if (response.result===true){
            
            setErrors(errors);
            setFormEnabled(true);
          }else{
            errors.push("signal");
            setErrors(errors);
            setFormEnabled(false);
          }
          
        
    })
    //.catch((response) =>null );
  //handleAxiosError(response)
}



  const handleAxiosError = (response) => {
    let errorToDisplay = "OCURRIO UN ERROR INESPERADO!";
    
    // eslint-disable-next-line
    if (response.message=="Network Error") {
      errorToDisplay = "OCURRIÓ UN ERROR EN LA COMUNICACIÓN. Reintente a la brevedad";
    }

    //setError(errorToDisplay);
    notifyError(errorToDisplay);
  }


 const notifyError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  }


  const submit = () =>{
    const formData = new FormData();

		formData.append('station',signal);

    putRecoveryOnQueue(formData)       
        .then((response) => {
            props.qslHook();
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
    if (hasWhiteSpace(signal)){
      errors.push("signal")
    }
  
    setErrors(errors);

    if (errors.length > 0) {
        notifyError("VERIFIQUE LOS DATOS CARGADOS EN EL FORMULARIO!");
        return false;
    } else {
        submit();
        
    }
  }

  const hasWhiteSpace = (s) =>{
    return /\s/g.test(s);
  }

   
  const hasError= (key) => {
        return errors.indexOf(key) !== -1;
  }


  

  return (

       <form onSubmit={handleSubmit} className="row g-3 needs-validation">
           <div class="">
           <ToastContainer />
               <div className="row rowForm mb-5">
                  <div className="col-12">
                    <h5>Completá tu señal distintiva y te reenviaremos el código  que permitira la carga de los contactos.</h5>
                  </div>
                </div>

            <Row className="mb-3 col-13">
            <div class="col-5">
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
                    Esta señal distintiva es incorrecta o puede no estar registrada.
                   </div>

               </Form.Group>

            </div>
          </Row>
                <div className="row">
                    <div className="col-12 text-right">
                            <button type="submit" 
                                  class={formEnabled?"btn btn-success m-2" :"btn btn-outline-success m-2"}

                                    disabled={!formEnabled}

                            >Confirmar</button>
                    </div>
                </div>
           </div>
           
    </form>
  
  );
}
