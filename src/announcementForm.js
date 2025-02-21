import {Form, Row} from "react-bootstrap";
import { useEffect } from 'react';
import { useState } from "react";
import { putAnnouncement} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';



export default function FormRequest(props) {
 
  const [signal, setSignal] = useState("");
  const [type, setType ] = useState(null);
 
  const [errors, setErrors] = useState([]);
  

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeSignal  = (event) => {
    setSignal(event.target.value.toUpperCase());
  };

  

useEffect(() => {
  // eslint-disable-next-line
    if (sessionStorage.getItem("userLoginOK") && sessionStorage.getItem("userLoginOK")==1){
      setSignal(sessionStorage.getItem("userStation").toUpperCase());
    }

  // eslint-disable-next-line
}, []
)

  const handleAxiosError = (response) => {
    console.log (response);
    let errorToDisplay="";
    if (response.code==="ERR_BAD_REQUEST"){
       // eslint-disable-next-line
      if (response.request.error_message=="Duplicado"){
        errorToDisplay = "¡YA ESTAS REGISTRADO!";    
      }else{
        errorToDisplay = response.request.error_message;    
      }
    }else{
      errorToDisplay = "OCURRIO UN ERROR INESPERADO!";
    }
  
    
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
    formData.append('category',type);
       

    putAnnouncement(formData)       
        .then((response) => {
            props.qslHook();
        })
        .catch((response) => handleAxiosError(response));

  }


  const handleSubmit = (event) => {
    
    event.preventDefault();
    var errors = [];
    

    if (!type) {
      errors.push("type");
    }
    
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
                    <h5>Por favor, manifestá tu intención de participar en el concurso. De esta manera nos ayudarás a computar correctamente todos los contactos.</h5>
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
                    Escriba un indicativo válido
                   </div>

               </Form.Group>

               </div>
              
             </Row>

             <Row className="mb-6 col-6">
                <Form.Group className="mb-6" controlId="bandValue">
                    <Form.Label>CATEGORÍA</Form.Label>
                    <select id="activity" onChange={handleChangeType} value={type} className={
                        hasError("type")
                              ? "form-select is-invalid "
                              : "form-select " 
                      }>
                        <option selected disabled value="">Elija una categoría...</option>
                        
                        <option value={0}>OPERADOR ÚNICO</option>
                        <option value={1}>RADIOESCUCHA</option>
                        <option value={2}>RADIOCLUB / GRUPO</option>                                      
                    </select>
                    <div
                        className={
                          hasError("type")
                                ? "invalid-feedback"
                                : "visually-hidden"
                        }
                    >
                      Seleccione un categoría válida
                    </div>
                </Form.Group>
            </Row>  



                       
                           <div className="row">&nbsp;</div>

                           <div className="row float-end">
                              <div className="col-12 ">
                                <button type="submit" className="btn btn-success">Anunciar</button>
                              </div>
                           </div>
           </div>
           
    </form>
  
  );
}
