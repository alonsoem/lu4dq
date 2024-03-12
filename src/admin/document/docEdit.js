import React from 'react';
import {useState,useEffect} from 'react';
import {Form, Row,Table} from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import {getDocumentById, putDocument} from "../../api/api";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {useNavigate} from 'react-router-dom';
import { useParams} from 'react-router-dom';
import NavAdmin from '../navAdmin';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { saveAs } from 'file-saver';

export default function EditDoc() {

  const { id } = useParams(); 

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [props, setProps] = useState([]);
  
  const [title, setTitle ] = useState("");
  
  const [imageFile, setImageFile ] = useState(null);
  const [updateImageFile, setUpdateImageFile] = useState(false);


  const [imageFt8File, setImageFT8File ] = useState(null);
  const [updateImageFileFT8, setUpdateImageFileFT8] = useState(false);
  
  const [show, setShow] = useState(false);
  const [ showImage , setShowImage ] = useState(null);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getDocumentById({id:id})       
    .then((response) => {
        setItem(response.document);
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


const ModalForm=()=>{
  console.log();
  return (
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
      </Modal.Header>
          <Modal.Body>
              <div class="container vw-90 vh-50 text-center" role="button">
                  <img  class="rounded img-fluid"  
                  src={(showImage?"https://lu4dq.qrits.com.ar/dinamic-content/"+showImage.name:"https://lu4dq.qrits.com.ar/dinamic-content/IMG/noimage.jpg")}
                  alt="Previzualización de imagen" 
                  />
              </div>
          </Modal.Body>
    </Modal>

    
  );
  
}

const setItem= (item) =>{
  setTitle(item.description);
  setImageFT8File(item.imageFT8);
  setImageFile(item.image);
  setProps(item.props);

  if (item.image){
    setImageFile(new File([new Blob()],item.image,{type: "image/jpeg"}));
  }
  if (item.imageFT8){
    setImageFT8File(new File([new Blob()],item.imageFT8,{type: "image/jpeg"}));
  }
}
   
const handleChangeTitle=(event)=>{
  setTitle(event.target.value);
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
      
  navigate('/status/admin/doc');    

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
    
    formData.append('updateImage', updateImageFile);
    formData.append('updateImageFT8', updateImageFileFT8);
    formData.append('description', title);
    formData.append('id',id);
    
    
    
    putDocument(formData)       
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



const handleRemoveFile =(setFileHook, updateFileHook =null)=>{
  setFileHook(null);
  if (updateFileHook){
    updateFileHook(true);
  }
}

const handleShow = (type,file) => {
  if (type==="DOC"){
    //var newFileName = type+"/"+file.name;
    downloadFile(file);
    //setShowImage(new File([file.Blob],newFileName,{type: file.type}));
    
  }else{
    var newFileName = type+"/"+file.name;
    console.log(newFileName);
    setShowImage(new File([file.Blob],newFileName,{type: file.type}));
    setShow(true);
  }
  
}
const downloadFile=(file)=>{
    
  const fileParts = file.name.split('.');
  const fileName=fileParts[0]+"."+fileParts[1];
  
  saveAs("https://lu4dq.qrits.com.ar/dinamic-content/DOC/"+fileName, fileName);
}


const onFileChange = (event,setFileHook,updateFileHook=null) => {
  setFileHook(event.target.files[0]);
  if (updateFileHook){
    updateFileHook(true);
  }
  
};
	
const Imageconditional = (params) =>{

  //replica funcion de activityEdit.js
  if (!params.file){
    var accepts ="image/jpeg";
    if (params.type==="DOC"){
      accepts="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    return(
      <div class="p-4">
        <input  ref={null} accept={accepts} class="form-control" type="File" id="formFile"  onChange={(e)=>onFileChange(e,params.setFileHook,params.updateFileHook)} />
      </div>
    );
  }else{
    if (params.file){
    return(
      <div class="p-4">
        <span  onClick={()=>handleShow(params.type,params.file)} style={{ cursor: 'pointer'}} >{params.file.name}</span>
          <span  onClick={()=>handleRemoveFile(params.setFileHook,params.updateFileHook)} class="text-danger ms-4" style={{ cursor: 'pointer'}} >
            <FontAwesomeIcon   icon={icon({name: 'rectangle-xmark'})}  title="Click para eliminar este archivo." />
        </span>
      </div>
    )
    }else{
      return(
        <div class="p-4">
          NO SE PUDO CARGAR LA IMAGEN
        </div>
      )
    }
    
  }
   
    
}


    return (
      
      <div>
      <ModalForm />
      <NavAdmin />
      <form onSubmit={handleSubmit} className="row g-3 needs-validation">
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
                                    
                                        <Row className="m-4">
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
                                    
                                    <Row className="m-4 ">
                                    <fieldset class="border p-3 mb-3">
                                          <legend  class="float-none w-auto t-4">Imagen para QSL o CERTIFICADO (JPG)</legend>
                                      

                                      <Form.Group className="mb-3" controlId="modeValue">
                                        <Imageconditional type="IMG" file={imageFile} setFileHook={setImageFile} updateFileHook={setUpdateImageFile}/>
                                       

                                      </Form.Group>
                                      
                                      </fieldset>
                                    </Row>

                                    <Row className="m-4 ">
                                    <fieldset class="border p-3 mb-3">
                                          <legend  class="float-none w-auto t-4">Imagen para QSL o CERTIFICADO FT8 (JPG)</legend>
                                      
                                      <Form.Group  className="mb-3" controlId="frontPageFile">
                                        
                                        <Imageconditional type="IMG" file={imageFt8File} setFileHook={setImageFT8File} updateFileHook={setUpdateImageFileFT8}/>
									                      
                                        

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
                                      </fieldset>
                                    </Row>


                                    <Row className="m-4 ">
                                    <fieldset class="border p-3 mb-3">
                                          <legend  class="float-none w-auto t-4">PARAMETRÍA</legend>
                                      
                                          <table class="table table-bordered " >
                                            <thead class="table-success" >
                                            <tr>
                                              <th>Nombre</th>
                                              <th>Fila</th>
                                              <th>Col Inicio</th>
                                              <th>Col Fin</th>
                                              <th>Tamaño Fuente</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                                {props.map(each=>{
                                                  return(
                                                    <tr>
                                                      <td>{each.name}</td>
                                                      <td>{each.row}</td>
                                                      <td>{each.colStart}</td>
                                                      <td>{each.colEnd}</td>
                                                      <td>{each.fontSize}</td>
                                                    </tr>
                                                  );
                                                })
                                                }
                                              

                                            </tbody>
                                          </table>
                                        </fieldset>
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
    