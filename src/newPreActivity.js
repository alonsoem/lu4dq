import React from 'react';
import {useRef, useState} from 'react';
import {Form, Row} from "react-bootstrap";
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';

import { setActivity } from './api/api.js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {useNavigate} from 'react-router-dom';
import NavMenu from './nav.js';

//import { descriptors } from 'chart.js/dist/core/core.defaults';

function PreAct() {

  const navigate = useNavigate();

	  const actual= new Date();
    const dateData = new Date(actual.getUTCFullYear(),actual.getUTCMonth(),actual.getUTCDate(),actual.getUTCHours(),actual.getUTCMinutes());
   
        
    const [errors, setErrors] = useState([]);
    const [title, setTitle ] = useState("");
    
    const [tecnicalDetails, setTecnicalDetails ] = useState(EditorState.createEmpty());
    
    const [dateFrom, setDateFrom] = useState(format(dateData,"yyyy-MM-dd"));
    const [dateTo, setDateTo] = useState(format(dateData,"yyyy-MM-dd"));
    const [late_end, setLateEnd] = useState(format(dateData,"yyyy-MM-dd"));

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    
    const [ selectedDocFile, setDocFile ] = useState(null);
    
    const handleChangeDescriptionHtml=(state)=>{
      setEditorState(state);
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

 

    const handleChangeTitle=(event)=>{
      setTitle(event.target.value);
    }



    const handleChangeTecnicalDetails=(state)=>{
      setTecnicalDetails(state);
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
      
  navigate('/rcpanel');    

};


const submit = () =>{
  
  //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object


    if (selectedDocFile){
      formData.append(
        "docFile",
        selectedDocFile,
        selectedDocFile.name
      );
    }
   

    
		formData.append('title', title);
		formData.append('start', dateFrom.replace(/\D/g, ""));
    formData.append('end', dateTo.replace(/\D/g, ""));
    formData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())),);
    formData.append('late_end', late_end.replace(/\D/g, ""));
    
    formData.append('techDetail', draftToHtml(convertToRaw(tecnicalDetails.getCurrentContent())),);
  
    setActivity(formData)       
      .then((response) => {
        navigateToAdmin();
         
          console.log(response);         
      })
      .catch((response) => handleAxiosError(response));

}


const handleSubmit = (event) => {
  
  event.preventDefault();
  var errors = [];

  

  // Check title
  if (title.length<=5) {
      errors.push("title");
  }
  // Check description
  if (editorState.length<=10) {
    errors.push("description");
  }




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




const onDocFileChange = event => {
  setDocFile(event.target.files[0] );
};




const docFileData = () => {

  if (selectedDocFile) {
    return (
      
      <div>
        <h2>Detalles:</h2>
        <p>Nombre: {selectedDocFile.name}</p>
        <p>
          Tamaño:{" "}
          {fileSize(selectedDocFile.size)}
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

const docInputRef = useRef(null);



  
    return (
      <div>
        <NavMenu />
        
      
      <form onSubmit={handleSubmit} className="row g-3 needs-validation">
            <div className="container d-flex ">
            <ToastContainer />
                <div className="container-fluid table-scroll-vertical col-11">
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">PRE-CARGA DE ACTIVIDAD</span>       
                        </div>
                        <div className="card-body" >

                            <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                                <div className="card-body" >
                                    
                                       
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
                                        editorStyle={{ height: '400px' }} 
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


                                        
                                    
                               
                                        
                                        <fieldset class="border p-3 mb-3">
                                          <legend  class="float-none w-auto t-4">BASES</legend>
                                          <Row className="mb-3 col-12">
                                          
                                          <Form.Group className="mb-3" controlId="technicalValue">
                                            <Form.Label>Detalle</Form.Label>
                                            <div class="p-2 bg-white">
                                              <Editor
                                              editorStyle={{ height: '300px' }} 
                                              editorState={tecnicalDetails}
                                              toolbarClassName="toolbarClassName"
                                              wrapperClassName="wrapperClassName"
                                              editorClassName="editorClassName"
                                              
                                              onEditorStateChange={handleChangeTecnicalDetails}
                                            />

                                            </div>
                                        
                                                    <div
                                                        className={
                                                          hasError("tecnicalDetails")
                                                                ? "invalid-feedback"
                                                                : "visually-hidden"
                                                        }
                                                    >
                                                      Las bases no pueden quedar vacias!
                                                    </div>

                                          </Form.Group>
                                         
                                          <Row className="m-2 ">
                                          
                                            <Form.Group  className="mb-3" controlId="file">
                                              <Form.Label  >Documento de texto (DOC, DOCX, PDF)</Form.Label>
                                              <input  ref={docInputRef} class="form-control" type="File" id="formFile"  onChange={onDocFileChange} />
                                              {docFileData()}
                                            </Form.Group>
                                          </Row>
                                          

                                          </Row>
                                        </fieldset>
                                                                             

                                   

                                    


                                                  
                                    

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
      </div>
        );

    }
    export default PreAct;