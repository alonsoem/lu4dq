import React from 'react';
import {useState,useEffect} from 'react';

import {Form, Row,Popover, OverlayTrigger,Button} from "react-bootstrap";
import {getName} from "./api/api";




import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

import { saveAs } from 'file-saver';
import NavMenu from './nav';


const Escudos=()=> {

  const [name, setName] = useState("");
  const [callsign, setCallsign] =  useState("");
  const [show, setShow] = useState(false);
  const [ showImage , setShowImage ] = useState(null);
  const handleClose = () => setShow(false); 

  useEffect(() => {
    // eslint-disable-next-line
    if (sessionStorage.getItem("userLoginOK") && sessionStorage.getItem("userLoginOK")==1){
      
      getName({station:sessionStorage.getItem("userStation")})
          .then((response) => {
            setName(response.name);
            setCallsign(sessionStorage.getItem("userStation"));  
            }
          )
    
    }
   
    // eslint-disable-next-line
    }, [sessionStorage]
  ) 

const ModalForm=(props)=>{
    return (
      <Modal
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
          Muestra de Escudo
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
                <Modal.Footer>
        <Button onClick={props.download}>Descargar</Button>
      </Modal.Footer>
    </Modal>

    
  );
  
}

   




const handleShowPreview=(callsign,name)=> {
  
  setShowImage(new File([new Blob()],"api/createEscudo.php?callsign="+callsign + "&name="+name+"&rnd="+Math.floor(Math.random() * (1000)) + 1,{type: "image/jpeg"}));
  setShow(true);
}

const downloadFile=()=>{
    
  
  const url = "https://lu4dq.qrits.com.ar/api/createEscudo.php?callsign="+callsign + "&name="+name+"&rnd="+Math.floor(Math.random() * (1000)) + 1
  saveAs(url, "escudo_"+callsign+".jpg");
}


	const handleChangeName = (event)=>{
    setName(event.target.value);
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
                        <ModalForm download={downloadFile} />
                               <div  className="mt-4 " >                 
                                
                                <div class="container-fluid  ">
                                <div class="row ">
                                <div class="  m-auto  col-lg-10 col-md-10 col-sm-10 col-xs-12 col-12" >
                                    <div className="card" style={{'background-color': 'rgba(181,181,181,0.6)'}}>
                                        <div className="card-header headerLu4dq">
                                            <span class="display-6 ">MI ESTACiÓN</span>       
                                        </div>
                                    
                                        <div className="card-body" >

                                           
                                            <div class="row col-12" >
                                               
                                                <div class="col col-9" >
                                                   <div className="row rowForm mb-5 col-12">
                                                      <div className="col-12">
                                                        <h5>Ahora Imprimí tu escudo de radioaficionado con el logo de LU4DQ-Log!</h5>
                                                      </div>
                                                        <h5>Solo necesitas hacer click en Mostrar y luego descargalo para usarlo donde quieras! Si preferis, poder editar el nombre que aparece bajo tu señal distintiva.</h5>
                                                      
                                                                                                     
                                                    </div>
                                                     <div class=" col-12 col m-auto text-center">
                                                        <img height="150" width="150" 
                                                        src="https://lu4dq.qrits.com.ar/dinamic-content/escudos/miniescudo.png" 
                                                        class="img-fluid" alt="Nuestro primer escudo!" />
                                                      </div>    

                                                    <Row >
                                      

                                          
                                           <Row className="mb-3">
                                              <Form.Group readonly className="mb-3" controlId={"callsignvalue"} >
                                                <Form.Label>SEÑAL DISTINTIVA</Form.Label>
                                                <span class="ms-2">
                                                  <OverlayTrigger trigger="hover" placement="right" overlay={popoverCallsign}>
                                                            <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                                                    </OverlayTrigger>
                                                  </span>
                                                <Form.Control  value={callsign} className="form-control" />
                                              </Form.Group>
                                            </Row>

                                          
                                           <Row className="mb-3">
                                              <Form.Group readonly className="mb-3" controlId={"namevalue"} >
                                                <Form.Label>NOMBRE</Form.Label>
                                                <span class="ms-2">
                                                  <OverlayTrigger trigger="hover" placement="right" overlay={popoverName}>
                                                            <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
                                                    </OverlayTrigger>
                                                  </span>
                                                <Form.Control  value={name} className="form-control"  onChange={handleChangeName}/>
                                              </Form.Group>
                                            </Row>

    
                                        
                                          <div className="row ">
                                            <div className=" col-12 text-end">
                                              <button type="button" onClick={()=>handleShowPreview(callsign,name)} style={{ cursor: 'pointer'}}  className="btn btn-success">Mostrar</button>
                                            </div>
                                         </div>
                                        
                                        
                                    </Row>
                                    
                                  
                                                </div>
                                                
                                                 <div class="col col-3" >
                                                    <ul class="list-group">
                                                    <a href="/profile" class="list-group-item list-group-item-action">Mis datos</a>
                                                    <a href="/escudos" class="list-group-item list-group-item-action">Escudos</a>
                                                    
                                                    </ul>
                                                </div>
                                            </div>
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