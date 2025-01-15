import React from 'react';
import { useState,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import {Form, Row,Tabs,Tab} from "react-bootstrap";
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import {updateActivity,getActivity,getDocuments, addNewStation,addMode,removeMode, getActivityModes, getActivityStations, removeStation} from "../../api/api";
import {  Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {ContentState,  EditorState, convertToRaw } from 'draft-js';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { saveAs } from 'file-saver';
import NavMenu from '../../nav';
import NavAdmin from '../navAdmin';

function ActivityEdit(params){

  const { id } = useParams(); 
  const navigate = useNavigate();
  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const actual= new Date();
  const dateData = new Date(actual.getUTCFullYear(),actual.getUTCMonth(),actual.getUTCDate(),actual.getUTCHours(),actual.getUTCMinutes());
 
  const [type, setType ] = useState(0);
  
  const [errors, setErrors] = useState([]);
  const [title, setTitle ] = useState("");
  const [word, setWord ] = useState("");
  const [mode, setMode ] = useState("");
  const [modeList, setModeList] = useState([]);
  const [tecnicalDetails, setTecnicalDetails ] = useState(EditorState.createEmpty());
  const [minContacts, setMinContacts ] = useState(0);
  const [cwContacts, setCwcontacts ] = useState(0);

  const [enabled, setEnabled ] = useState(false);

  const [dateFrom, setDateFrom] = useState(format(dateData,"yyyy-MM-dd"));
  const [timeFrom, setTimeFrom] = useState(format(dateData,"H:i"));
  const [dateTo, setDateTo] = useState(format(dateData,"yyyy-MM-dd"));
  const [timeTo, setTimeTo] = useState(format(dateData,"H:i"));
  const [late_end, setLateEnd] = useState(format(dateData,"yyyy-MM-dd"));

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const [ documentId, setDocumentId ] = useState(null);
  const [ documents, setDocuments ] = useState([]);

  const [ selectedDocFile, setDocFile ] = useState(null);
  const [ frontPageFile, setFrontPageFile ] = useState(null);
  const [ showImage , setShowImage ] = useState(null);
  const [stations, setStations] = useState([]);
  const [newStation,setNewStation]=useState("");
  const [newLetter,setNewLetter]=useState("");
  const [newReq,setNewReq]=useState(false);
  
  


  const handleShow = (type,file) => {
    if (type==="DOC"){
      //var newFileName = type+"/"+file.name;
      downloadFile(file);
      //setShowImage(new File([file.Blob],newFileName,{type: file.type}));
      
    }else{
      var newFileName = type+"/"+file.name;
      setShowImage(new File([file.Blob],newFileName,{type: file.type}));
      setShow(true);
    }
    
  }

  const handleChangeMode  = (event) => {
    setMode(event.target.value.toUpperCase());
  };

  const downloadFile=(file)=>{
    
    const fileParts = file.name.split('.');
    const fileName=fileParts[0]+"."+fileParts[1];
    
    saveAs("https://lu4dq.qrits.com.ar/dinamic-content/DOC/"+fileName, fileName);
  }

	
    
useEffect(
  () => {

    getDocuments()       
    .then((response) => {
      setDocuments(response.documents);

         
    })
    .catch((response) => handleAxiosError(response));

      return;

    // eslint-disable-next-line
  },[]
)

const handleChangeWord = (event)=>{
  setWord(event.target.value);
}

const handleChangeCwcontacts = (event)=>{
  setCwcontacts(event.target.value);
}

const handleAddStation = (event) =>{
  
  
  addNewStation({
    activityId:id,
    station:newStation,
    letter:newLetter,
    required:newReq?1:0
  })
  .then(response=>{
    setNewReq(false);
    setNewLetter("");
    setNewStation("");
    updateStationList()

  }

    

  )
  .catch(error=>{
    console.log(error);
    }
  )

}

const resetModeForm = () =>{
  setMode(null);

}

const handleAddMode = (event) =>{
  
  
  addMode({
    activityId:id,
    mode:mode,
    
  })
  .then(response=>{
    resetModeForm();
    updateModeList();

  }

    

  )
  .catch(error=>{
    console.log(error);
    }
  )

}

const updateStationList=()=>{
  getActivityStations({id:id})
  .then(response=>{
      setStations(response.stations);
    }
  ).catch(error=>{
    console.log(error);
  }
  )
}
const updateModeList=()=>{
  getActivityModes({id:id})
  .then(response=>{
      setModeList(response.modes);
    }
  ).catch(error=>{
    console.log(error);
  }
  )
}

    const handleChangeDescriptionHtml=(state)=>{
      setEditorState(state);
    }

    const handleRemoveFile =(setFileHook)=>{
        setFileHook(null);
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
    const handleChangeTimeFrom = (value) => {
      setTimeFrom(value);
    };
    

    const handleChangeDateTo = (value) => {
      setDateTo(value);
    };
    const handleChangeTimeTo = (value) => {
      setTimeTo(value);
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


    const handleChangeTecnicalDetails=(state)=>{
      setTecnicalDetails(state);
    }

    const hasError= (key) => {
      return errors.indexOf(key) !== -1;
    }

    const handleDocumentChange=(event)=>{
      setDocumentId(event.target.value);
    }

    const handleChangeNewReq = (event)=>{
      setNewReq(event.target.value);
    }
    const handleChangeNewLetter = (event)=>{
      setNewLetter(event.target.value.toUpperCase());
    }
    const handleChangeNewStation = (event)=>{
      setNewStation(event.target.value.toUpperCase());
    }

  useEffect(() => {
    
    getActivity({id:id})       
    .then((response) => {
      try{
        setDateFrom(response.start);
        setTimeFrom(response.startTime);
        setDateTo(response.end);
        setTimeTo(response.endTime);
        setLateEnd(response.lateEnd);
        setTitle(response.title);
        setType(response.type);  
        setWord(response.word);    
        setMinContacts(response.minContacts);
        setCwcontacts(response.cwContacts);
        setEnabled(response.enabled);
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(response.description))));
        setTecnicalDetails(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(response.tecnical))));
        setStations(response.stations);
        setModeList(response.modes);
        
        //setFile(new File([new Blob()],response.image,{type: "image/jpeg"}));
        setDocumentId(response.documentId);
        
        if (response.doc){
          setDocFile(new File([new Blob()],response.doc,{type: "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"}));
        }
        

        if (response.frontImage){
          setFrontPageFile(new File([new Blob()],response.frontImage,{type: "image/jpeg"}));
        }
        
        

      }catch(e){
        console.log(e);
      }
        
         
    })
    .catch((response) => handleAxiosError(response));

      return;

      // eslint-disable-next-line
      },[]
  )

   
   
const handleAxiosError = (response) => {
  console.log(response);   
  let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
  
  console.log("HANDLEAXIOSERROR form load");
  //console.log(response);
      // eslint-disable-next-line
 
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

const handleRemoveStation = (id) =>{
  
  
  removeStation({
    id:id
  })
  .then(response=>{
    updateStationList()

  }

    

  )
  .catch(error=>{
    console.log(error);
    }
  )

}

const handleRemoveMode = (id) =>{
  
  
  removeMode({
    id:id
  })
  .then(response=>{
    updateModeList()

  }

    

  )
  .catch(error=>{
    console.log(error);
    }
  )

}

const submit = () =>{
  
  //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  
		// Create an object of formData
		const formData = new FormData();



    //if file.size()==0 then notupdate
    //en php recibe archivo si el size es cero no actualiza y si sino sube el archivo nuevo

    if (selectedDocFile){
      formData.append(
        "docFile",
        selectedDocFile,
        selectedDocFile.name
      );
    }
    

    if (frontPageFile){
      formData.append(
        "frontPageFile",
        frontPageFile,
        frontPageFile.name
      );
    }
    
		formData.append('id', id);
		formData.append('doc', documentId);
    formData.append('enabled', enabled);
		formData.append('type', type);
    formData.append('word', word);
		formData.append('title', title);
		formData.append('start', dateFrom.replace(/\D/g, ""));
    formData.append('startTime', timeFrom);
    formData.append('end', dateTo.replace(/\D/g, ""));
    formData.append('endTime', timeTo);
    formData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())));
    formData.append('late_end', late_end.replace(/\D/g, ""));
    formData.append('minContacts', minContacts);
    formData.append('cwContacts', cwContacts);
    formData.append('techDetail', draftToHtml(convertToRaw(tecnicalDetails.getCurrentContent())),);
  
    updateActivity(formData)       
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


  console.log(type);

  // eslint-disable-next-line
if (type==2 && word.length<=1) {
  errors.push("word");
}
// eslint-disable-next-line
if (type==1 && minContacts<1) {
  errors.push("minContacts");
}
 // eslint-disable-next-line
 if ((type==2 || type==1) && cwContacts<0) {
  errors.push("cwContacts");
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

  if (!documentId){
    errors.push("doc");
  }

  setErrors(errors);

  if (errors.length > 0) {
      return false;
  } else {
      submit();
  }
}



const onFileChange = (event,setFileHook) => {
  setFileHook(event.target.files[0]);
};



const ModalForm=()=>{
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



	
	
const Imageconditional = (params) =>{
  console.log(params);
  if (!params.file){
    var accepts ="image/jpeg";
    if (params.type==="DOC"){
      accepts="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    return(
      <div class="p-4">
        <input  ref={null} accept={accepts} class="form-control" type="File" id="formFile"  onChange={(e)=>onFileChange(e,params.setFileHook)} />
      </div>
    );

  }else{
    if (params.file){
      return(
        <div class="p-4">
          <span  onClick={()=>handleShow(params.type,params.file)} style={{ cursor: 'pointer'}} >{params.file.name}</span>
            <span  onClick={()=>handleRemoveFile(params.setFileHook)} class="text-danger ms-4" style={{ cursor: 'pointer'}} >
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


const cwContactsComponent=()=>{
  // eslint-disable-next-line
if (type==2 || type==1){
  return (
    <div class="col-3">
  
                                         <Form.Group className="mb-3" controlId="nameValue">
                                            <Form.Label>CW - CONTACTOS MINIMOS</Form.Label>
                                            <Form.Control  onChange={handleChangeCwcontacts} value={cwContacts} type="number"
                                                            className={
                                                              hasError("cwContacts")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"
                                                            }/>
                                              <div
                                                  className={
                                                    hasError("cwContacts")
                                                          ? "invalid-feedback"
                                                          : "visually-hidden"
                                                  }
                                              >
                                                Se necesita un valor mayor o igual a cero
                                              </div>

                                          </Form.Group>
                                      </div> );
}else{
  return null;
}


}



const minimumContactsComponent=()=>{
  // eslint-disable-next-line
if (type==1){
  return (
    <div class="col-3">
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
                                          </div> );
}else{
  return null;
}


}

const wordComponent =()=>{
  // eslint-disable-next-line
  if (type==2){
    
    return (
      <div class="col-6">
      <Form.Group className="mb-3" controlId="wordValue">
         <Form.Label>PALABRA A COMPLETAR</Form.Label>
         <Form.Control  onChange={handleChangeWord} value={word} type="text"
                         className={
                           hasError("word")
                                 ? "form-control is-invalid"
                                 : "form-control"
                         }/>
           <div
               className={
                 hasError("word")
                       ? "invalid-feedback"
                       : "visually-hidden"
               }
           >
             Se necesita un texto mayor a 1 caracter
           </div>

       </Form.Group>
       </div>
    );
  }else{
    return null;
  }
  
  
  }


    return (
      
      <div>
            <NavMenu />
            <NavAdmin />
            <div className="container d-flex ">
            <ModalForm />
            <ToastContainer />
                <div className="container-fluid table-scroll-vertical col-11">
                
  
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">MODIFICAR ACTIVIDAD</span>       
                        </div>
                        <div className="card-body" >

                            <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                                <div className="card-body" >
                                <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Principal">
        
        
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
                                                    <option value={2}>CERTIFICADO POR LETRAS</option>
                                                    <option value={3}>CONCURSO</option>
                                                    
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
 


                                       
                                    
                                    
                                        
                                    
                                                        
                                    <Row className="mb-3 col-9">
                                              <div class="col-4">
                                              <Form.Group className="mb-3" controlId="dateFrom">
                                    <Form.Label>FECHA UTC INICIO</Form.Label>
                                    
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
                                              <Form.Group className="mb-3" controlId="dateFrom">
                                    <Form.Label>HORA UTC INICIO</Form.Label>
                                    
                                    <Form.Control  onChange={(e) => handleChangeTimeFrom(e.target.value)} value={timeFrom} type="time" 
                                                    className={
                                                      hasError("timeFrom")
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                    }/>
                                      <div
                                          className={
                                            hasError("timeFrom")
                                                  ? "invalid-feedback"
                                                  : "visually-hidden"
                                          }
                                      >
                                        Indicar una fecha correcta
                                      </div>

                                  </Form.Group>
                                                  
                    </div>
                    </Row>
                    <Row className="mb-3 col-9">
                                              <div class="col-4">
                                              <Form.Group className="mb-3" controlId="timeValue">
                                    <Form.Label>FECHA UTC FINAL</Form.Label>
                                    
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
                                              <Form.Group className="mb-3" controlId="dateFrom">
                                    <Form.Label>HORA UTC FINAL</Form.Label>
                                    
                                    <Form.Control  onChange={(e) => handleChangeTimeTo(e.target.value)} value={timeTo} type="time" 
                                                    className={
                                                      hasError("timeTo")
                                                            ? "form-control is-invalid"
                                                            : "form-control"
                                                    }/>
                                      <div
                                          className={
                                            hasError("timeTo")
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
                                          

                                         

                                          </Row>
                                          <Row className=" mb-3  col-12">
                                          
                                          <fieldset class="border p-3 m-3 mb-3">
                                            <legend  class="float-none w-auto t-4">Documento de texto (DOC, DOCX, PDF)</legend>
                                            <Form.Group  className="mb-3" controlId="file">
                                              <Imageconditional type="DOC" file={selectedDocFile} setFileHook={setDocFile}/>
                                              
                                            </Form.Group>
                                            </fieldset>
                                          
                                          </Row>
                                        </fieldset>
                                                                             

                                   


                                    
                                    <fieldset class="border p-3 mb-3">
                                      <legend  class="float-none w-auto t-4">Documento Imagen para imprimir</legend>
                                      <Row className="mb-3 align-middle col-12">
                                          
                                      <Form.Group className="mb-3" controlId="modeValue">
                                        
                                        
                                        <select id="doc"  onChange={handleDocumentChange}
                                          className={
                                            hasError("doc")
                                                  ? "form-select is-invalid"
                                                  : "form-select"
                                          } >
                                                                    
                                                                    {
                                                                      documents.map(doc=>{
                                                                        //eslint-disable-next-line
                                                                        if (documentId==doc.id){
                                                                          return <option selected value={doc.id} >{doc.description}</option>
                                                                        }else{
                                                                          return <option  value={doc.id} >{doc.description}</option>
                                                                        }
                                                                      })
                                                                    }
                                                                    </select>
                                          <div
                                              className={
                                                hasError("doc")
                                                      ? "invalid-feedback"
                                                      : "visually-hidden"
                                              }
                                          >
                                            Seleccione un documento válido
                                          </div>

                                      </Form.Group>
                                      
                                        </Row>
                                    </fieldset>
                                    

                                    <fieldset class="border p-3 mb-3">
                                      <legend  class="float-none w-auto t-4">Imagen de PORTADA (JPG)</legend>
                                    <Row className="mb-3 align-middle col-12">
                                      
                                      <Form.Group  className="mb-3" controlId="frontPageFile">
                                        
									                      <Imageconditional type="FRT" file={frontPageFile} setFileHook={setFrontPageFile}/>

                                        <div
                                              className={
                                              hasError("frontPageFile")
                                                      ? "invalid-feedback"
                                                      : "visually-hidden"
                                              }
                                          >
                                          Incluya una imagen para usar como certificado o qsl.
                                          </div>
                                      </Form.Group>
                                    </Row>
                                    </fieldset>

                                    <Row className="mb-3 align-middle col-12">
                                      
                                      <Form.Group  className="mb-3" controlId="swlValue">
                                        <Form.Label  >Habilitada</Form.Label>
                                        <div class="form-check mb-3">
                                          <input
                                              type="checkbox"
                                              onChange={handleChangeEnabled}  
                                              defaultChecked={enabled}
                                              checked ={enabled}
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
        






      </Tab>
      <Tab eventKey="profile" title="Estaciones y Contactos">
            <Row className="mb-9 m-3"> 
              {minimumContactsComponent()}
              {cwContactsComponent()}
              {wordComponent()}
            </Row>  
                                            
            <div class="col-12">
       
          <Row className="m-3">
          <fieldset class="border p-3 mb-3">
            <legend  class="float-none w-auto t-4">ESTACIONES</legend>

            <div class="col-12">
            <Row className="m-3 col-6">
                  <Form.Group className="mb-3 col-3" controlId="stationValue">
                  <Form.Label>ESTACION</Form.Label>
                  <Form.Control  onChange={handleChangeNewStation} value={newStation} type="text" size="10" maxlength="10"
                                  className={
                                    hasError("station")
                                          ? "form-control is-invalid"
                                          : "form-control"
                                  }/>
                    <div
                        className={
                          hasError("station")
                                ? "invalid-feedback"
                                : "visually-hidden"
                        }
                    >
                      Se necesita un texto mayor a 1 caracter
                    </div>

                </Form.Group>

                <Form.Group className="mb-3 col-3" controlId="letterValue">
                  <Form.Label>LETRA</Form.Label>
                  <Form.Control  onChange={handleChangeNewLetter} value={newLetter} type="char" size="1" maxlength="1"
                                  className={
                                    hasError("letter")
                                          ? "form-control is-invalid"
                                          : "form-control"
                                  }/>
                    <div
                        className={
                          hasError("letter")
                                ? "invalid-feedback"
                                : "visually-hidden"
                        }
                    >
                      Se necesita un texto mayor a 1 caracter
                    </div>

                </Form.Group>

       <Form.Group  className="mb-3 col-3" controlId="swlValue">
          <Form.Label  >REQUERIDA</Form.Label>
          <div class="form-check mb-3">
            <input
                type="checkbox"
                onChange={handleChangeNewReq}  
                defaultChecked={newReq}
                checked ={newReq}
                value={newReq}
                class={"form-check-input form-control"}
                id="swlCheckRequired"
            />

          </div>               

         
        </Form.Group>

       <button type="button"  class="btn btn-sm btn-primary col-3" onClick={handleAddStation} >AGREGAR</button> 
       
        </Row>
            </div>
              <ul class="list-group col-4">
              {stations.map(each=>{
                return(
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span  class="text-danger " style={{ cursor: 'pointer' }} onClick={()=> handleRemoveStation(each.id)}>
                        <FontAwesomeIcon   icon={icon({name: 'trash-can'})}  title="Click para cambiar el estado" />
                        <span class="text-black ms-4">{each.station}</span>
                    </span>
                    <span class="align-items-left bg-danger"></span>
                  
                  
                  {each.letter?
                    <span class="badge bg-success rounded-pill">{each.letter}</span>
                    :
                    null
                  }
                  {each.required?
                    <span class="badge bg-primary rounded-pill">REQUERIDA</span>
                    :
                    null
                  }
                </li>  
                )
              }
              )}
            
            
          </ul>
          </fieldset>
        </Row>  
    


      </div>
</Tab>
<Tab eventKey="modes" title="Modos">
  
                                            
            <div class="col-12">
       
          <Row className="m-3">
          <fieldset class="border p-3 mb-3">
            <legend  class="float-none w-auto t-4">MODOS</legend>

            <div class="col-12">
            <Row className="m-3 col-12">
                <Form.Group className="mb-3 col-4" controlId="modeValue">
                    <Form.Label>MODO</Form.Label>
                    
                    <select id="mode"  onChange={handleChangeMode}
                      className={
                        hasError("mode")
                              ? "form-select is-invalid"
                              : "form-select"
                      } >
                                                <option selected disabled value="">Elija un modo...</option>
                                                <option value="cw">CW</option>
                                                <option value="am">AM</option>
                                                <option value="ssb">SSB</option>
                                                <option value="atv">ATV</option>
                                                <option value="sstv">SSTV</option>
                                                <option value="PACKET">PACKET</option>
                                                <option value="APRS">APRS</option>
                                                <option value="RTTY">RTTY</option>
                                                <option value="FM">FM</option>
                                                <option value="FT8">FT 8</option>
                                                <option value="FT4">FT 4</option>
                                                <option value="PSK">PSK</option>
                                                <option value="JT9">JT9</option>
                                                <option value="OLIVIA">Olivia</option>
                                                <option value="ECHO">Echo</option>
                                                <option value="JT65">JT65</option>
                                                <option value="HELL">HELL</option>
                                                <option value="FAX">FAX</option>
                                                <option value="DV">DV</option>
                                                <option value="SATCW">Sat CW</option>
                                                <option value="SATFM">Sat FM</option>
                                                <option value="SATSSB">Sat SSB</option>
                                                <option value="SIM31">SIM31</option>
                                                </select>
                      <div
                          className={
                            hasError("mode")
                                  ? "invalid-feedback"
                                  : "visually-hidden"
                          }
                      >
                        Seleccione un modo válido
                      </div>

                </Form.Group>
              

             <button type="button"  class="btn btn-sm btn-primary col-2" onClick={handleAddMode} >AGREGAR</button> 
       
          </Row>
            </div>
              <ul class="list-group col-4">
              {modeList.map(each=>{
                return(
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span  class="text-danger " style={{ cursor: 'pointer' }} onClick={()=> handleRemoveMode(each.id)}>
                        <FontAwesomeIcon   icon={icon({name: 'trash-can'})}  title="Click para cambiar el estado" />
                        <span class="text-black ms-4">{each.mode}</span>
                    </span>
                    <span class="align-items-left bg-danger"></span>
                  
                </li>  
                )
              }
              )}
            
            
          </ul>
          </fieldset>
        </Row>  
    


      </div>
  </Tab>
    </Tabs>
    
                                    
                                       
                                   
                                    

                                    <div className="row">&nbsp;</div>

                                    <div className="row">
                                      <div className="col-12 text-right">
                                      <form onSubmit={handleSubmit} className="row g-3 needs-validation">
                                        <button type="submit" className="btn btn-success">Confirmar</button>
                                        </form>
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
    export default ActivityEdit;