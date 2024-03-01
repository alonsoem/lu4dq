import React from 'react';
import {useRef, useState} from 'react';
import {Form, Row} from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import {postDocument} from "./api/api";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {useNavigate} from 'react-router-dom';
import NavAdmin from './navAdmin';

function AdminDoc() {

  const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
  
    const [title, setTitle ] = useState("");
    const [imageFile, setImageFile ] = useState(null);
    const [imageFt8File, setImageFT8File ] = useState(null);

   
    const handleChangeTitle=(event)=>{
      setTitle(event.target.value);
    }

    const onImageFileChange = event => {
      setImageFile(event.target.files[0] );
    };
    
    const onImageFT8FileChange = event => {
      setImageFT8File(event.target.files[0] );
    };
    

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


    if (imageFile){
      formData.append(
        "imageFile",
        imageFile,
        imageFile.name
      );
    }

    if (imageFt8File){
      formData.append(
        "imageFileFT8",
        imageFt8File,
        imageFt8File.name
      );
    }
    
		
    formData.append('description', title);
		
    
    
    postDocument(formData)       
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
      .catch((error) => {
        console.log(error);
        handleAxiosError(error);
       }
      );

}


const handleSubmit = (event) => {
  
  event.preventDefault();
  var errors = [];

  

  // Check title
  if (title.length<=5) {
      errors.push("title");
  }
  if (!imageFile){
    errors.push("imageFile");
  }

  setErrors(errors);

  if (errors.length > 0) {
      return false;
  } else {
      submit();
  }
}










const frontPageFileData = () => {

  if (imageFt8File) {
    return (
      
      <div>
        <h2>Detalles:</h2>
        <p>Nombre: {imageFt8File.name}</p>
        <p>
          Tamaño:{" "}
          {fileSize(imageFt8File.size)}
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
const frontPageRef =useRef(null);

	
	





    return (
      
      <div>
      <NavAdmin />
      <form onSubmit={handleSubmit} className="row g-3 needs-validation">
            <div className="container d-flex ">
            <ToastContainer />
                <div className="container-fluid table-scroll-vertical col-11">
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">NUEVO DOCUMENTO</span>       
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
                                                Indique una descripción válida
                                              </div>

                                          </Form.Group>
                                        </Row>  
                                    
                                    <Row className="mb-3 align-middle col-12">

                                      <Form.Group className="mb-3" controlId="modeValue">
                                        <Form.Label>Imagen para QSL o CERTIFICADO (JPG)</Form.Label>
                                        <input  ref={docInputRef} accept="image/jpeg" class="form-control" type="file" id="docformFile"  onChange={onImageFileChange} 
                                          className={
                                                              hasError("imageFile")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }
                                        />
                                       
                                          <div
                                              className={
                                                hasError("imageFile")
                                                      ? "invalid-feedback"
                                                      : "visually-hidden"
                                              }
                                          >
                                            Seleccione un documento válido
                                          </div>

                                      </Form.Group>
                                      
                                      
                                    </Row>

                                    <Row className="mb-3 align-middle col-12">
                                      
                                      <Form.Group  className="mb-3" controlId="frontPageFile">
                                        <Form.Label  >Imagen para QSL o CERTIFICADO FT8 (JPG)</Form.Label>
									                      <input  ref={frontPageRef} accept="image/jpeg" class="form-control" type="file" id="frontPageformFile"  onChange={onImageFT8FileChange} 
                                          className={
                                                              hasError("imageFT8File")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }
                                        />
                                        {frontPageFileData()}

                                        <div
                                              className={
                                              hasError("imageFT8File")
                                                      ? "invalid-feedback"
                                                      : "visually-hidden"
                                              }
                                          >
                                          Incluya una imagen para usar como certificado o qsl.
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
    export default AdminDoc;