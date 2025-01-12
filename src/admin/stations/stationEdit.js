import React from 'react';
import {useState,useEffect} from 'react';
import {Form, Row} from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import { getStations,putName} from "../../api/api";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {useNavigate} from 'react-router-dom';
import { useParams} from 'react-router-dom';
import NavAdmin from '../navAdmin';

import NavMenu from '../../nav';

export default function EditStation() {

  const { stationId } = useParams(); 

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [name, setName] = useState("");
  
  const [email, setEmail ] = useState("");
  const [editable, setEditable] = useState(false);

  const [itu, setItu ] = useState("");
  const [grid, setGrid ] = useState("");
  const [cqZone, setCqZone ] = useState("");
  
  

  useEffect(() => {
    getStations({type:0,value:stationId})       
    .then((response) => {
        setItem(response.stations[0]);
//        setLoading(false);
    })
    .catch((response) => {
        //handleAxiosError(response)
        console.log(response);
  //      setLoading(false);
        }
    );

    // eslint-disable-next-line
}, []
)



const setItem= (item) =>{

  setName(item.name);
  setEmail(item.email);
  setCqZone(item.cqzone);
  setEditable(item.updateable==="true"?true:false);
  setGrid(item.grid);
  setItu(item.itu);


}
   
const handleChangeName=(event)=>{
  setName(event.target.value);
}
const handleChangeEmail=(event)=>{
  setEmail(event.target.value);
}
const handleChangeItu=(event)=>{
  setItu(event.target.value);
}
const handleChangeGrid=(event)=>{
  setGrid(event.target.value);
}
const handleChangeCqZone=(event)=>{
  setCqZone(event.target.value);
}

const handleChangeEditable=(event)=>{
  setEditable(event.target.value);
}




const hasError= (key) => {
  return errors.indexOf(key) !== -1;
}


   
const handleAxiosError = (response) => {
  let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
  console.log(response.response.data);
  console.log("HANDLEAXIOSERROR form");
  //console.log(response);
      // eslint-disable-next-line
  if (response.response.data.code==1062 ) {
        errorToDisplay = "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS.";
      }
  if (response.response.data.status==="Station not validated" ) {
        errorToDisplay = "EL CODIGO DE ESTACION NO ES CORRECTO. VERIFIQUELO!";
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

const navigateToAdmin = () => {
      
  navigate('/rcpanel/stations');    

};


const submit = () =>{
  
 const formData = new FormData();
 
    formData.append('station',stationId);
     formData.append('name',name);
     formData.append('email',email);
     formData.append('itu',itu?itu:null);
     formData.append('cqZone',cqZone?cqZone:null);
     formData.append('grid',grid);
 
    
 
     putName(formData)       
         .then((response) => {
             navigateToAdmin();
         })
         .catch((response) => handleAxiosError(response));
 

}


const handleSubmit = (event) => {
  
  event.preventDefault();
  var errors = [];

  

  // Check title
  if (name.length<=10) {
      errors.push("name");
  }
  
  if (email.length<=5) {
    errors.push("email");
}

  setErrors(errors);

  if (errors.length > 0) {
      return false;
  } else {
      submit();
  }
}




	


    return (
      
      <div>
        <NavMenu />
      
      <NavAdmin />
      <form onSubmit={handleSubmit} className="row g-3 needs-validation">
            <div className="container d-flex ">
            <ToastContainer />
                <div className="container-fluid table-scroll-vertical col-11">
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">MODIFICAR ESTACIÓN</span>       
                        </div>
                        <div className="card-body" >

                            <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                                <div className="card-body" >
                                    
                                        <Row className="m-4">
                                         <Form.Group className="mb-3" controlId="stationValue">
                                            <Form.Label>SEÑAL DISTINTIVA</Form.Label>
                                            <Form.Control value={stationId.toUpperCase()} disabled readOnly />
                                              

                                          </Form.Group>
                                        </Row>  

                                        <Row className="m-4">
                                         <Form.Group className="mb-3" controlId="nameValue">
                                            <Form.Label>NOMBRE TITULAR</Form.Label>
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
                                                Indique un titular válido
                                              </div>

                                          </Form.Group>
                                        </Row>  

                                        <Row className="m-4">
                                         <Form.Group className="mb-3" controlId="emailValue">
                                            <Form.Label>E-MAIL</Form.Label>
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
                                                Indique una dirección de correo válida
                                              </div>

                                          </Form.Group>
                                        </Row>  

                                        <Row className="m-4">
                                          <fieldset class="border p-3 mb-3">
                                            <legend  class="float-none w-auto t-4">ZONAS</legend>
                                            <Row class="row">
                                            <div class="col-3">
                                              <Form.Group className="mb-3" controlId="nameValue">
                                              <Form.Label>GRID</Form.Label>
                                              <Form.Control  onChange={handleChangeGrid} value={grid} />

                                            </Form.Group>
                                            </div>
                                            
                                            <div class="col-3">
                                            
                                                <Form.Group className="mb-3" controlId="nameValue">
                                                      <Form.Label>ITU</Form.Label>
                                                      <Form.Control  onChange={handleChangeItu} value={itu} />
                                                        

                                                    </Form.Group>
                                            </div>
                                            <div class="col-3">
                                                <Form.Group className="mb-3" controlId="nameValue">
                                                <Form.Label>CQ ZONE</Form.Label>
                                                <Form.Control  onChange={handleChangeCqZone} value={cqZone} />

                                              </Form.Group>
                                            
                                            </div>
                                            </Row>
                                        
                                        
                                        </fieldset>
                                         
                                        </Row>  
                                        <Row className="m-4 align-middle col-12">
                                      
                                      <Form.Group  className="mb-3" controlId="editValue">
                                        
                                        <div class="form-check mb-3">
                                          <input
                                              type="checkbox"
                                              onChange={handleChangeEditable}  
                                              defaultChecked={editable}
                                              checked ={editable}
                                              value={editable}
                                              id="editValue"
                                          />
                                          <label class="form-check-label ms-3" for="swlCheck">
                                                ¿Permitir que sea editable por los usuarios?
                                          </label>
                                        </div>               

                                       
                                      </Form.Group>
                                    </Row>
        

                                        
                                     
                                        
                                    
                                    
                                  
                                    <div className="row">&nbsp;</div>

                                    <div className="row">
                                      <div className="col-12 text-right">
                                        <button type="submit" className="btn btn-success">Guardar</button>
                                      </div>
                                    </div>

                                </div>
                            </div>
                    

                    </div>
                  
                    </div>

            
                </div>
            </div>
      </form>
      </div>
        );

    }
    