//import "./styles.css";
import {Form, Row,Popover, OverlayTrigger} from "react-bootstrap";
import { useEffect } from 'react';
import { useState } from "react";
import {getName, putName} from "./api/api";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useCookies } from 'react-cookie';

export default function FormRequest(props) {
  const [cookies] = useCookies(['logCallsign']);
 
  const [signal, setSignal] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [itu, setItu] = useState("");
  const [gridLocator, setGridLocator] = useState("");
  const [cqZone, setCqZone] = useState("");
  const [errors, setErrors] = useState([]);
  

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeSignal  = (event) => {
    /*setSignal(event.target.value.toUpperCase());
    getName({station:event.target.value})
        .then((response) => {
          setName(response.name);
          setEmail(response.mail);
          
      })
      .catch((response) => handleAxiosError(response));
    */
   updateFromCallsign(event.target.value.trim());
  };

  const handleChangeItu  = (event) => {
    setItu(event.target.value.toUpperCase());
  };
  const handleChangeGridLocator = (event) => {
    setGridLocator(event.target.value);
  };
  const handleChangeCqZone  = (event) => {
    setCqZone(event.target.value);
  };
  

const updateFromCallsign= (callsign)=>{
  setSignal(callsign.toUpperCase());
  getName({station:callsign})
      .then((response) => {
        setName(response.name);
        setEmail(response.mail);
        setItu(response.itu===0?null:response.itu);
        setGridLocator(response.grid===0?null:response.grid);
        setCqZone(response.cqZone);
        
    })
    .catch((response) => handleAxiosError(response));

}
useEffect(() => {
  console.log("STARTUP - LEO COOKIE");
  if(cookies["logCallsign"]){
    updateFromCallsign(cookies["logCallsign"]);
  }
  
  
  
  // eslint-disable-next-line
}, []
)

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
    formData.append('name',name);
    formData.append('email',email);
    formData.append('itu',itu?itu:null);
    formData.append('cqZone',cqZone?cqZone:null);
    formData.append('grid',gridLocator);

   

    putName(formData)       
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
  
    if (name.length < 3) {
      errors.push("name");
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


  const popoverEmail = (
    
    <Popover id="popover-positioned-right"  placement="right" >
      <Popover.Title as="h3">Dirección de email </Popover.Title>
      <Popover.Content>
          La dirección de <strong> e-mail</strong> nos servirá para volver contactarte o para acceder a la plataforma ;-)
      </Popover.Content>
      
    </Popover>
    
  );
  const popoverFullName = (
    <Popover id="popover-positioned-right"  placement="right" >
    <Popover.Title as="h3">Nombre Completo</Popover.Title>
        <Popover.Content>
          <p>Es el nombre completo asociado a la señal distintiva</p>
          <p>Se utiliza normalmente para mostrar en los certificados y si fuera necesario puede modificarlo luego de indicar la señal distintiva</p>
        </Popover.Content>
      </Popover>
    );
  
  
const popoverItu = (
  <Popover id="popover-positioned-right"  placement="right" >
  <Popover.Title as="h3">ZONA ITU</Popover.Title>
      <Popover.Content>
        <p>Es la zona de la estación segun la division realizada por la Unión Internacional de Telecomunicaciones.</p>
        <p>Por ejemplo, a la zona norte de Argentina le corresponde zona 14 y a la zona sur 16.</p>
      </Popover.Content>
    </Popover>
  );

  const popoverGridLocator = (
    <Popover id="popover-positioned-right"  placement="right" >
    <Popover.Title as="h3">GRID LOCATOR</Popover.Title>
        <Popover.Content>
          <p>Un grid locator es un sistema de coordenadas geográficas que permite identificar de manera precisa la ubicación de una estación de radioaficionado en la Tierra.</p>
        </Popover.Content>
      </Popover>
    );

    const popoverCqZone = (
      <Popover id="popover-positioned-right"  placement="right" >
      <Popover.Title as="h3">CQ ZONE</Popover.Title>
          <Popover.Content>
            <p>Una Zona CQ se refiere a una de las divisiones geográficas utilizadas para organizar y facilitar las comunicaciones internacionales en radio.</p>
            <p>En Argentina la Zona CQ es 13.</p>
          </Popover.Content>
        </Popover>
      );
  

  

  return (

       <form onSubmit={handleSubmit} className="row g-3 needs-validation">
           <div class="">
           <ToastContainer />
               <div className="row rowForm mb-5">
                  <div className="col-12">
                    <h5>Por favor, completá el registro con los datos de tu licencia de radioaficionado para poder participar de las actividades.</h5>
                    <h5>Esos datos seran utilizados para imprimir los certificados y para validar los contactos que cargues!</h5>
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
               <div class="col-7">
               <Form.Group className="mb-3" controlId="nameValue">
                 <Form.Label>NOMBRE COMPLETO</Form.Label>
                 <span class="ms-2">
                 <OverlayTrigger trigger="hover" placement="right" overlay={popoverFullName}>
                      <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                 </OverlayTrigger>
                 </span>
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

               </div>
             </Row>

         


           

             <Row className="mb-3">
               <Form.Group className="mb-3" controlId="emailValue">
                 <Form.Label>E-MAIL de CONTACTO</Form.Label>
                 <span class="ms-2">
                   <OverlayTrigger trigger="hover" placement="right" overlay={popoverEmail}>
                            <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                    </OverlayTrigger>
                  </span>
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
                    Escribe una dirección de email válida
                   </div>

               </Form.Group>
             </Row>


             <Row className="mb-3 col-12">
            <div class="col-3">
               <Form.Group className="mb-3" controlId="signalValue">
                 <Form.Label>ITU</Form.Label>
                 <OverlayTrigger trigger="hover" placement="right" overlay={popoverItu}>
                      <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                 </OverlayTrigger>
                 <Form.Control  onChange={handleChangeItu} value={itu} 
                                className={"form-control"}/>

               </Form.Group>

               </div>
               <div class="col-3">
               <Form.Group className="mb-3" controlId="nameValue">
                 <Form.Label>GRID LOCATOR</Form.Label>
                 <span class="ms-2">
                 <OverlayTrigger trigger="hover" placement="right" overlay={popoverGridLocator}>
                      <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                 </OverlayTrigger>
                 </span>
                 <Form.Control  onChange={handleChangeGridLocator} value={gridLocator}
                                className={"form-control"}/>


               </Form.Group>

               </div>
               <div class="col-3">
               <Form.Group className="mb-3" controlId="nameValue">
                 <Form.Label>CQ ZONE</Form.Label>
                 <span class="ms-2">
                 <OverlayTrigger trigger="hover" placement="right" overlay={popoverCqZone}>
                      <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                 </OverlayTrigger>
                 </span>
                 <Form.Control  onChange={handleChangeCqZone} value={cqZone}
                                className={"form-control"}/>

               </Form.Group>

               </div>
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
