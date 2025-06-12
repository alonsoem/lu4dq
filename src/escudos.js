import React from 'react';
import {useState,useEffect} from 'react';

import {Form, Row,Popover, OverlayTrigger} from "react-bootstrap";
import {getName} from "./api/api";

import { ToastContainer, toast } from 'react-toastify';


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import { saveAs } from 'file-saver';
import NavMenu from './nav';


const Escudos=()=> {


  const [name, setName] = "";
  const [callsign, setCallsign] = "";
    
  const [show, setShow] = useState(false);
  const [ showImage , setShowImage ] = useState(null);
  const handleClose = () => setShow(false);
   
  

  useEffect(() => {
    
    if (sessionStorage.getItem("userLoginOK") && sessionStorage.getItem("userLoginOK")==1){
      console.log(sessionStorage.getItem("userStation"));
  
      getName({station:sessionStorage.getItem("userStation")})
          .then((response) => {
            setName(response.name);
        
    })
    
      
    }
   
    // eslint-disable-next-line
}, []
)



  


const ModalForm=()=>{
  console.log();
  return (
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
          Muestra de documento
        </Modal.Title>
      </Modal.Header>
          <Modal.Body>
              <div class="container vw-90 vh-50 text-center" role="button">
                  <img  class="rounded img-fluid"  
                  src={(showImage?"https://lu4dq.qrits.com.ar/"+showImage.name:"https://lu4dq.qrits.com.ar/dinamic-content/IMG/noimage.jpg")}
                  alt="Previzualización de imagen" 
                  />
              </div>
          </Modal.Body>
    </Modal>

    
  );
  
}

   




const handleShowPreview=(callsign)=> {
  
  setShowImage(new File([new Blob()],"api/createEscudo.php?callsign="+callsign + "&rnd="+Math.floor(Math.random() * (1000)) + 1,{type: "image/jpeg"}));
  setShow(true);
}

const downloadFile=(file)=>{
    
  const fileParts = file.name.split('.');
  const fileName=fileParts[0]+"."+fileParts[1];
  
  saveAs("https://lu4dq.qrits.com.ar/dinamic-content/DOC/"+fileName, fileName);
}


	

 const popoverName = (
    
    <Popover id="popover-positioned-right"  placement="right" >
      <Popover.Title as="h3">Nombre</Popover.Title>
      <Popover.Content>
          Es el nombre como queres que lo imprimamos en el escudo.
      </Popover.Content>
      
    </Popover>
    
  );

   const popoverCallsign = (
    
    <Popover id="popover-positioned-right"  placement="right" >
      <Popover.Title as="h3">SEÑAL DISTINTIVA</Popover.Title>
      <Popover.Content>
          Es la señal distintiva que se imprimirá en el escudo. NO PUEDE MODIFICARSE
      </Popover.Content>
      
    </Popover>
    
  );

    return (
      
      <div>
        <NavMenu />
      <ModalForm />
      
      
            <div className="container d-flex ">
            <ToastContainer />
                <div className="container-fluid table-scroll-vertical col-11">
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">EDITAR DOCUMENTO</span>       
                        </div>
                        <div className="card-body" >

                            <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                                <div className="card-body" >
                                    
                                      <Row className="mb-3">
                                        <Form.Group readonly className="mb-3" controlId="callsignValue" >
                                          <Form.Label>SEÑAL DISTINTIVA</Form.Label>
                                          <span class="ms-2">
                                            <OverlayTrigger trigger="hover" placement="right" overlay={popoverCallsign}>
                                                      <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                                              </OverlayTrigger>
                                            </span>
                                          <Form.Control  value={callsign} 
                                                          className="form-control"  />
                                            

                                        </Form.Group>
                                      </Row>

                                       <Row className="mb-3">
                                        <Form.Group className="mb-3" controlId="nameValue" >
                                          <Form.Label>NOMBRE</Form.Label>
                                          <span class="ms-2">
                                            <OverlayTrigger trigger="hover" placement="right" overlay={popoverName}>
                                                      <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                                              </OverlayTrigger>
                                            </span>
                                          <Form.Control  value={name} 
                                                          className="form-control"  />
                                            

                                        </Form.Group>
                                      </Row>
             
                                       

                                    


                                    <Row className="m-4 ">
                                    <fieldset class="border p-3 mb-3">
                                          <legend  class="float-none w-auto t-4">PARAMETRÍA</legend>
                                      
                                        
                                          <div className="row ms-auto">
                                      <div className=" col-12 ms-auto">
                                        <button type="button" onClick={()=>handleShowPreview(callsign)} style={{ cursor: 'pointer'}}  className="btn btn-success">Ver Impresión</button>
                                      </div>
                                    </div>
                                        </fieldset>
                                        
                                    </Row>
                              
                                  
                                   

                                </div>
                            </div>
                    

                    </div>
                  
                    </div>

            
                </div>
            </div>
      
      </div>
        );

    }
    export default Escudos;