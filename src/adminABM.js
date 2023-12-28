import React from 'react';
import {useRef, useState, } from 'react';
import {Form, Row} from "react-bootstrap";
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import {setActivity} from "./api/api";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {useNavigate} from 'react-router-dom';
//import { descriptors } from 'chart.js/dist/core/core.defaults';

function AdminABM() {

  const navigate = useNavigate();

	  const actual= new Date();
    const dateData = new Date(actual.getUTCFullYear(),actual.getUTCMonth(),actual.getUTCDate(),actual.getUTCHours(),actual.getUTCMinutes());
   
    const [type, setType ] = useState("");
    
    const [errors, setErrors] = useState([]);
    const [title, setTitle ] = useState("");
    //const [description, setDescription ] = useState("");
    const [tecnicalDetails, setTecnicalDetails ] = useState("");
    const [minContacts, setMinContacts ] = useState(0);
    const [enabled, setEnabled ] = useState(false);

    const [dateFrom, setDateFrom] = useState(format(dateData,"yyyy-MM-dd"));
    const [dateTo, setDateTo] = useState(format(dateData,"yyyy-MM-dd"));
    const [late_end, setLateEnd] = useState(format(dateData,"yyyy-MM-dd"));

    const [editorState, setEditorState] = useState(EditorState.createEmpty());



    /*const handleChangeDescription=(event)=>{
      setDescription(event.target.value);
    }*/
    const handleChangeDescriptionHtml=(state)=>{
      setEditorState(state);
    }

    const handleChangeType =(event)=>{
      setType(event.target.value);
    }
    
    const handleChangeEnabled =(event)=>{
      setEnabled(event.target.checked);
    }

    const handleChangeDateFrom = (value) => {
      setDateFrom(value);
    };

    const handleChangeDateTo = (value) => {
      setDateTo(value);
    };

    const handleChangeLateEnd = (value) => {
      setLateEnd(value);
    };

    const handleChangeMinContacts=(event)=>{
        setMinContacts(event.target.value);
    }

    const handleChangeTitle=(event)=>{
      setTitle(event.target.value);
    }


    const handleChangeTecnicalDetails=(event)=>{
      setTecnicalDetails(event.target.value);
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
      
  navigate('/status/admin');    

};


const submit = () =>{
  
  //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"file",
			selectedFile,
			selectedFile.name
		);
		formData.append('enabled', enabled);
		formData.append('type', type);
		formData.append('title', title);
		formData.append('start', dateFrom.replace(/\D/g, ""));
    formData.append('end', dateTo.replace(/\D/g, ""));
    formData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())),);
    formData.append('late_end', late_end.replace(/\D/g, ""));
    formData.append('minContacts', minContacts);
    formData.append('techDetail', tecnicalDetails);
  /*{
      enabled:enabled,
      type:type,
      title: title,
      start:dateFrom.replace(/\D/g, ""),
      end:dateTo.replace(/\D/g, ""),
      description:draftToHtml(convertToRaw(editorState.getCurrentContent())),
      late_end:late_end.replace(/\D/g, ""),
      minContacts:minContacts,
      techDetail:tecnicalDetails,
      
      }*/
    setActivity(formData)       
      .then((response) => {
        navigateToAdmin();
         /* //eslint-disable-next-line
          if (response.qsl.status=="RC Confirmed"){
              
          //eslint-disable-next-line
          }else if (response.qsl.status=="Confirmed"){
              
          }else{
              
              //handleAPIError(response);
          }*/
          console.log(response);         
      })
      .catch((response) => handleAxiosError(response));

}


const handleSubmit = (event) => {
  
  event.preventDefault();
  var errors = [];

  
  // Check type
  if (type.length===0) {
    errors.push("type");
  }
  // Check title
  if (title.length<=5) {
      errors.push("title");
  }
  // Check description
  if (editorState.length<=10) {
    errors.push("description");
  }

  // Check count
  if (minContacts<1) {
    errors.push("minContacts");
  }
  console.log(type);
  /*if (type.length==""){
    errors.push("type");
  }*/

  

  if (editorState.length < 3) {
    errors.push("description");
  }

  
  
  if (dateFrom.getUTCDate<actual.getUTCDate) {
    errors.push("dateFrom");
  }

  if (dateTo<dateFrom) {
    errors.push("dateTo");
  }

  if (late_end<dateTo) {
    errors.push("late_end");
  }

  if (tecnicalDetails.length<10){
    errors.push("tecnicalDetails");
  }

  setErrors(errors);

  if (errors.length > 0) {
      return false;
  } else {
      submit();
  }
}

const [ selectedFile, setFile ] = useState(null);

const onFileChange = event => {
  setFile(event.target.files[0] );
};

const fileData = () => {

  if (selectedFile) {
    return (
      
      <div>
        <h2>Detalles:</h2>
        <p>Nombre: {selectedFile.name}</p>
        <p>
          Tamaño:{" "}
          {fileSize(selectedFile.size)}
        </p>

      </div>
    );
  }
};
const fileSize=(size)=>{
  if (size/1024/1024>=1){
    return (parseFloat(size/1024/1024).toFixed(2)).toString()+" Mb"
  }else{
    return (parseFloat(size/1024).toFixed(2)).toString()+" Kb"
  }
}

const inputRef = useRef(null);

	
	





    return (
      <form onSubmit={handleSubmit} className="row g-3 needs-validation">
            <div className="container d-flex ">
            <ToastContainer />
                <div className="container-fluid table-scroll-vertical col-11">
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">NUEVA ACTIVIDAD</span>       
                        </div>
                        <div className="card-body" >

                            <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                                <div className="card-body" >
                                    
                                        <Row className="mb-3 col-3">
                                            <Form.Group className="mb-3" controlId="bandValue">
                                                <Form.Label>TIPO</Form.Label>
                                                <select id="activity" onChange={handleChangeType} value={type} className={
                                                    hasError("type")
                                                          ? "form-select is-invalid "
                                                          : "form-select " 
                                                  }>
                                                    <option selected disabled value="">Elija un tipo de actividad...</option>
                                                    
                                                    <option value={1}>CERTIFICADO</option>
                                                    <option value={0}>QSL ESPECIAL</option>
                                                    
                                                </select>
                                                <div
                                                    className={
                                                      hasError("type")
                                                            ? "invalid-feedback"
                                                            : "visually-hidden"
                                                    }
                                                >
                                                  Seleccione un tipo válido
                                                </div>
                                            </Form.Group>
                                        </Row>  
                                        
                                    <Row class="border mb-3 p-0 ">
                                    
                                        
                                    </Row>
                                    
                                        <Row className="mb-3">
                                         <Form.Group className="mb-3" controlId="nameValue">
                                            <Form.Label>TITULO</Form.Label>
                                            <Form.Control  onChange={handleChangeTitle} value={title}
                                                            className={
                                                              hasError("title")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }/>
                                              <div
                                                  className={
                                                    hasError("title")
                                                          ? "invalid-feedback"
                                                          : "visually-hidden"
                                                  }
                                              >
                                                Escribe al menos 3 caracteres de un Titulo
                                              </div>

                                          </Form.Group>
                                        </Row>  
                                    
                                    
                                        <Row className="mb-3">
                                         <Form.Group className="mb-3" controlId="nameValue">
                                            <Form.Label>DESCRIPCION</Form.Label>
                                            <div class="p-2 bg-white">
                                            <Editor
                                        
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        
                                        onEditorStateChange={handleChangeDescriptionHtml}
                                      />

                                      </div>
                                  
                                              <div
                                                  className={
                                                    hasError("description")
                                                          ? "invalid-feedback"
                                                          : "visually-hidden"
                                                  }
                                              >
                                                Escribe al menos 3 caracteres de un nombre
                                              </div>

                                          </Form.Group>
                                        </Row>  
                                    
                                                        
                                    <Row className="mb-3 col-13">
                                              <div class="col-4">
                                              <Form.Group className="mb-3" controlId="dateFrom">
                                    <Form.Label>FECHA INICIO</Form.Label>
                                    
                                    <Form.Control  onChange={(e) => handleChangeDateFrom(e.target.value)} value={dateFrom} type="date" 
                                                    className={
                                                      hasError("dateFrom")
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                    }/>
                                      <div
                                          className={
                                            hasError("dateFrom")
                                                  ? "invalid-feedback"
                                                  : "visually-hidden"
                                          }
                                      >
                                        Indicar una fecha correcta
                                      </div>

                                  </Form.Group>
                                                  
                    </div>
                                              <div class="col-4">
                                              <Form.Group className="mb-3" controlId="timeValue">
                                    <Form.Label>FECHA FINAL</Form.Label>
                                    
                                      <Form.Control  onChange={(e) => handleChangeDateTo(e.target.value)} value={dateTo} type="date" 
                                                    className={
                                                      hasError("dateTo")
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                    }/>
                                      <div
                                          className={
                                            hasError("dateTo")
                                                  ? "invalid-feedback"
                                                  : "visually-hidden"
                                          }
                                      >
                                        Indicar una fecha correcta
                                      </div>

                                  </Form.Group>

                                  
                                                </div>

                                      
                         
                                              
                                              <div class="col-4">
                                              <Form.Group className="mb-3" controlId="timeValue">
                                    <Form.Label>FECHA EXTENDIDA</Form.Label>
                                    
                                      <Form.Control  onChange={(e) => handleChangeLateEnd(e.target.value)} value={late_end} type="date" 
                                                    className={
                                                      hasError("late_end")
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                    }/>
                                      <div
                                          className={
                                            hasError("late_end")
                                                  ? "invalid-feedback"
                                                  : "visually-hidden"
                                          }
                                      >
                                        Indicar una fecha correcta
                                      </div>

                                  </Form.Group>

                                  
                                                </div>

                                      
                                  
                                </Row>


                                   

                                    
                                        <Row className="mb-3">
                                         <Form.Group className="mb-3" controlId="nameValue">
                                            <Form.Label>CONTACTOS MINIMOS</Form.Label>
                                            <Form.Control  onChange={handleChangeMinContacts} value={minContacts} type="number"
                                                            className={
                                                              hasError("minContacts")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }/>
                                              <div
                                                  className={
                                                    hasError("minContacts")
                                                          ? "invalid-feedback"
                                                          : "visually-hidden"
                                                  }
                                              >
                                                Se necesita un valor mayor a cero
                                              </div>

                                          </Form.Group>
                                        </Row>  
                                    

                                    
                                        
                                        <Row className="mb-3">
                                         <Form.Group className="mb-3" controlId="technicalValue">
                                            <Form.Label>DETALLES TECNICOS</Form.Label>
                                            <Form.Control  onChange={handleChangeTecnicalDetails} value={tecnicalDetails}
                                                            className={
                                                              hasError("tecnicalDetails")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }/>
                                              <div
                                                  className={
                                                    hasError("tecnicalDetails")
                                                          ? "invalid-feedback"
                                                          : "visually-hidden"
                                                  }
                                              >
                                                Los detalles técnicos no puede quedar vacíos
                                              </div>

                                          </Form.Group>
                                        </Row>  
                                    
                                    

                                    <Row className="mb-3 align-middle col-12">
                                      
                                      <Form.Group  className="mb-3" controlId="swlValue">
                                        <Form.Label  >Habilitada</Form.Label>
                                        <div class="form-check mb-3">
                                          <input
                                              type="checkbox"
                                              onChange={handleChangeEnabled}  
                                              defaultChecked={enabled}
                                              value={enabled}
                                              class={hasError("enabled")
                                                  ? "form-check-input form-control is-invalid"
                                                  : "form-check-input form-control"
                                              }
                                              id="swlCheck"
                                          />
                                          <label class="form-check-label ms-3" for="swlCheck">
                                                ¿Se muestra la actividad en los listados?
                                          </label>
                                        </div>               

                                        <div
                                              className={
                                              hasError("swl")
                                                      ? "invalid-feedback"
                                                      : "visually-hidden"
                                              }
                                          >
                                          Escribe al menos 3 caracteres de una señal distintiva
                                          </div>
                                      </Form.Group>
                                    </Row>


                                    <Row className="mb-3 align-middle col-12">
                                      
                                      <Form.Group  className="mb-3" controlId="file">
                                        <Form.Label  >Image para QSL o CERTIFICADO</Form.Label>
									                      <input  ref={inputRef} class="form-control" type="file" id="formFile"  onChange={onFileChange} />
                                        {fileData()}

                                        
                                      </Form.Group>
                                    </Row>

                                    

                                    <div className="row">&nbsp;</div>

                                    <div className="row">
                                      <div className="col-12 text-right">
                                        <button type="submit" className="btn btn-success">Confirmar</button>
                                      </div>
                                    </div>

                                </div>
                            </div>
                    

                    
                           
                    </div>
                    

                  
                    



                    
                    </div>

            
                </div>
            </div>
      </form>
        );

    }
    export default AdminABM;