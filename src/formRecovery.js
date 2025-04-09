//import "./styles.css";
import {Form, Row} from "react-bootstrap";
import { useState } from "react";
import {putRecoveryOnQueue} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";



export default function FormRequest(props) {
  const [email, setEmail] = useState("");
  const [signal, setSignal] = useState("");
  const [captcha, setCaptcha]=useState(false);
  
  const [errors, setErrors] = useState([]);
   


function onChangeCaptcha(value) {
  //console.log("Captcha value:", value);
  setCaptcha(true);

}
const handleChangeEmail  = (event) => {
  setEmail(event.target.value.trim());
}; 

const handleChangeSignal  = (event) => {
  setSignal(event.target.value.trim());
}; 




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

		formData.append('email',email);
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
    if (email.length<=5) {
        errors.push("email");
    }
    if (signal.length<4) {
      errors.push("signal");
  }

    if (!captcha){
      errors.push("captcha");
    }
  
    setErrors(errors);

    if (errors.length > 0) {
      if (!captcha){
        notifyError("¡FALTA QUE VERIFIQUES EL CAPTCHA!");
        
      }else{
        notifyError("VERIFIQUE LOS DATOS CARGADOS EN EL FORMULARIO!");
        
      }
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
           <div class="">
           <ToastContainer />
               <div className="row rowForm mb-5">
                  <div className="col-12">
                    <h5>Completá tu señal distintiva y el email registrado para la estación.<br/> ¡RECORDA QUE EL MAIL DEBE ESTAR REGISTRADO PREVIAMENTE! y te enviaremos el código que permitirá el ingreso al log.</h5>
                  </div>
                </div>

                <Row className="mb-3 col-13">
            <div class="col-3">
               <Form.Group className="mb-3" controlId="signalValue">
                 <Form.Label>TU ESTACIÓN</Form.Label>
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
                    Inlcuya una estación válida.
                   </div>

               </Form.Group>

            </div>
          </Row>
            <Row className="mb-3 col-13">
            <div class="col-5">
               <Form.Group className="mb-3" controlId="emailValue">
                 <Form.Label>TU EMAIL REGISTRADO</Form.Label>
                 <Form.Control  onChange={handleChangeEmail} value={email}
                                className={
                                  hasError("email")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }/>
                   <div
                       className={
                        hasError("email")
                               ? "invalid-feedback"
                               : "visually-hidden"
                       }
                   >
                    Esta dirección de email es incorrecta.
                   </div>

               </Form.Group>

            </div>
          </Row>

          <Row className="mb-3 col-13">
            <div class="col-5">
              <ReCAPTCHA
                sitekey="6LfYsRArAAAAADkz9tINB1Jb-7B3IGnW_TjTjS9a"
                onChange={onChangeCaptcha}
              />
              
                    
            </div>
          </Row>
                <div className="row">
                    <div className="col-12 text-right">
                            <button type="submit" 
                                  class={"btn btn-success m-2"}

                                    

                            >Confirmar</button>
                    </div>
                </div>
           </div>
           
    </form>
  
  );
}
