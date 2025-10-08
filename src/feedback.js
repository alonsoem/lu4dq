
import { useState} from 'react';
import {Form, Row} from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import { putMessage} from "./api/api";



import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";





function Feedback(props) {
  
  const [errors, setErrors] = useState([]);
  const [title, setTitle ] = useState("");
  const [onSend,setOnSend] = useState(false);
    
  const handleChangeTitle=(event)=>{
    setTitle(event.target.value);
  }
  const hasError= (key) => {
    return errors.indexOf(key) !== -1;
  }
 
  const handleAxiosError = (response) => {
    let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
    
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
    


  const submit = () =>{
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object


      
      formData.append('message', title);
      formData.append('station', props.station);
      formData.append('url', window.location.href);
      
      
      
      
      setOnSend(true);
      putMessage(formData)       
        .then((response) => {
            props.close();
                 
        })
        .catch((error) => {
          console.log(error);
          handleAxiosError(error);
          setOnSend(false);
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


  

    setErrors(errors);

    if (errors.length > 0) {
        return false;
    } else {
        submit();
    }
  }




	

const DinamicButton=()=>{
  if (onSend){
    return(
      
      <button class="btn btn-success" type="submit" disabled>
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Enviando...
      </button>
    )  ;
  }else{
    return (<button type="submit" className="btn btn-success">Enviar Mensaje</button>);
  }
  
}


    return (
      
      <div class="m-0">
        
      
      <form onSubmit={handleSubmit} className="row needs-validation">
            
            <ToastContainer />
                <div className="container-fluid table-scroll-vertical ">
                    <div className="card " >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">DEJANOS TU COMENTARIO</span>       
                        </div>
                        <div className="card-body" >

                            <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                                <div className="card-body" >
                                    
                                    <Row className="mb-3"><div class="text-justify fs-5" >Queremos que tengas la mejor experiencia en lu4dq-Log. Por eso esperamos que nos dejes tus reportes, comentarios, quejas, oportunidades de mejora, casos a revisar, lo que quieras. ¡Lo tendremos en cuenta para mejorar la experiencia de todos!</div></Row>
                                        <Row className="mb-3">
                                         <Form.Group className="mb-3" controlId="commentsValue">
                                            <Form.Label>TU MENSAJE: </Form.Label>
                                            <Form.Control  onChange={handleChangeTitle} value={title} as="textarea" rows={5}
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
                                                Indique un mensaje válido
                                              </div>

                                          </Form.Group>
                                        </Row>  


                                    <div className="row">
                                      <div className="col-12 text-right">
                                        <DinamicButton />
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
    export default Feedback;