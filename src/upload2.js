import {getName,postFile} from "./api/api";
import {useRef, useState} from 'react';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {Form, Row} from "react-bootstrap";
import { saveAs } from 'file-saver';

	function Upload(){
		const { stationCode } = useParams();

		const [ selectedFile, setFile ] = useState(null);
		const [ filas, setFilas ] = useState([]);
		const [ response, setResponse ] = useState(false);
		const [ responseError,setResponseError ] = useState(false);
		const [ error,setError ] = useState(false);
		const [ loading,setLoading ] = useState(false);
		const [errors, setErrors] = useState([]);
		const [signal, setSignal] = useState("");
  		const [name, setName] = useState("");
		const [email, setEmail] = useState("");
		const inputRef = useRef(null);


	

		const handleChangeName = (event) => {
			setName(event.target.value);
		  };
		  
	

		  const handleChangeEmail = (event) => {
			setEmail(event.target.value);
		  };

		  const handleChangeSignal  = (event) => {
			setSignal(event.target.value.toUpperCase());
			getName({station:event.target.value})
				.then((response) => {
				  setName(response.name);
				  
			  })
			  .catch((response) => handleAxiosError(response));
			
		  };

		  const handleAxiosError = (response) => {
			let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
			console.log("HANDLEAXIOSERROR");
			console.log(response);
				// eslint-disable-next-line
			if (response.response.data.code==1062 ) {
				  errorToDisplay = "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS.";
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

		const onFileChange = event => {
			setFile(event.target.files[0] );
		};

	
	const preEnvio=()=>{
		
		var errors = [];

		if (signal.length<=3) {
			errors.push("signal");
		}
		if (name.length<=3) {
			errors.push("name");
		}

		setErrors(errors);

		if (errors.length > 0) {
			return false;
		} else {
			setLoading(true);
			
			onFileUpload();
		}
		
	}
	
		// On file upload (click the upload button)
	const onFileUpload = () => {
		setError(false);
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"file",
			selectedFile,
			selectedFile.name
		);
		formData.append('stationCode', stationCode);
		formData.append('station', signal);
		formData.append('name', name);
		formData.append('email', email);
		
		postFile(formData)
			.then(res=>	{
							setLoading(false);
							showResults(res);
							
							
			}
			)
			.catch((res)=>{
				setError(true);
				setLoading(false);

				
				
				// eslint-disable-next-line
				if (res.response.data.status=="ERROR_UPLOADING"){
					setResponseError("No se pudo subir el archivo al servidor!");
				// eslint-disable-next-line
				}else if (res.response.data.status=="ERROR_PROCESSING"){
					setResponseError("Ocurrió un error procesando el archivo!");
				// eslint-disable-next-line
				}else if (res.response.data.status=="Station not validated" ) {
					setResponseError("EL CÓDIGO DE ESTACIÓN NO ES CORRECTO. VERIFIQUELO!");
				}else{
					setResponseError("Ocurrió un error inesperado!");
				}
				setResponse(true);	
			}
				
			);
		
	}

	const showResults=(res)=>{
		setFilas(res.rows);
		setResponse(true);
	}

	const fileSize=(size)=>{
		if (size/1024/1024>=1){
			return (parseFloat(size/1024/1024).toFixed(2)).toString()+" Mb"
		}else{
			return (parseFloat(size/1024).toFixed(2)).toString()+" Kb"
		}
	}

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
	

	const showBadgeMov = (reg) => {
		// eslint-disable-next-line
		if (reg.insert=="OK"){
			return <span class="badge bg-success">Aceptado</span>
		// eslint-disable-next-line
		}else if (reg.insert=="duplicate"){
			return <span class="badge bg-warning">{reg.insert}</span>
		// eslint-disable-next-line
		}else if (reg.insert=="No Match Station"){
			return <span class="badge bg-danger" data-toggle="tooltip" data-placement="right" data-title={reg.message} >
						{reg.message}
						</span>	
		}else{
			return <span class="badge bg-danger">{reg.message}</span>
		}
	}

	const downloadImage=(url)=>{
		saveAs(url, 'qsl.png');
	  }

	const qsl = (qsl) =>{
		// eslint-disable-next-line
		if (qsl.status=="RC Confirmed"){
			return (<button className="btn btn-success btn-sm" onClick={r=>
				downloadImage("http://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+qsl.document+"&chk="+qsl.chk)}>
					Descargar QSL
			</button>	);
		}else{
			return "-";
		}

	}

	const showLoading=()=>{
		if (loading){
			return(
		<div class="align-middle">
		<div class="spinner-border text-primary align-middle" role="status">
			  <span class="visually-hidden">Cargando...</span> 
		</div>
		<span class="align-middle ms-3">Procesando el archivo...</span>
	</div>
			)
		}
	}
	const showResultsTable = () => {

		// eslint-disable-next-line
		if (response==true) {
			if (error){

				return (
					<div  className="col-12 mt-3">
						<h3>{responseError}</h3>
	
					</div>
				);
			}else{

			return (
				<div  className="col-12 mt-3 border">
					<table className="table striped hover bordered responsive ">
					<thead>
						<tr class="table-primary">
							<th class="text-center">Resultado</th>
							<th class="text-center">Contraparte</th>
							<th class="text-center">Fecha</th>
							<th class="text-center">Hora</th>
							<th class="text-center">Confirmación</th>
	  					</tr>
					</thead>
					<tbody className="col-12">
									{filas.map(
									(r)=>(
											<tr  className="col-12">
												<td className="col-2 text-center">{showBadgeMov(r)}</td>
												<td className="col-4 text-center">{r.data.callsign}</td>
												<td className="col-2 text-center">{r.data.date}</td>
												<td className="col-2 text-center">{r.data.time}</td>
												<td className="col-2 text-center">		
													 {qsl(r.qsl)}										
													
												</td>

												
												</tr>
									)
								)}
								</tbody>

					</table>

				</div>
			);
			}
		
		}
	};

	const hasError= (key) => {
        return errors.indexOf(key) !== -1;
  }
	const haveFile=()=>{
		// eslint-disable-next-line
		return selectedFile!=null && response==false;
	}
	const haveReturned=()=>{
		// eslint-disable-next-line
		return response==true;
	}

	const showAnotherBtn=()=>{
		// eslint-disable-next-line
		return response==true;
	}
	
	const resetForm=()=>{
		setResponse(false);
		setFile(null);
		resetFileInput();
	}

	
	
	
	

	const resetFileInput = () => {
		// eslint-disable-next-line
		inputRef.current.value = null;
		
	};

		return (
			<div className="container d-flex gap-3 p-3">
			<div className="container col-10">
			<ToastContainer />

				
				<div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
					<div className="card-header headerLu4dq">
                            <span class="display-6 ">CARGA MASIVA (ADIF)</span>       
                    </div>
						<div className="card-body" >
						


							<div className="card-body " >

								<h1>
									Incluir un archivo ADIF 

								</h1>
								<div className="mt-3 ">
								<div className={haveReturned()?"card p-3 visually-hidden" :"card p-3"} >
									<div>

									<Row className="mb-3">
               <Form.Group className="mb-3" controlId="signalValue">
                 <Form.Label>SU ESTACION / INDICATIVO</Form.Label>
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
                    Escribir al menos 3 caracteres de un indicativo válido
                   </div>

               </Form.Group>
             </Row>

             <Row className="mb-3">
               <Form.Group className="mb-3" controlId="nameValue">
                 <Form.Label>NOMBRE COMPLETO</Form.Label>
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
             </Row>
			 <Row className="mb-3">
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
                    Escribe una dirección de mail válida
                   </div>

               </Form.Group>
             </Row>
									</div>
									
									
										<div class=" mb-3">
  											<label for="formFile" class="form-label"><h4>Elija un archivo y luego presione el boton "Subir al servidor"</h4></label>
  											<input  ref={inputRef} class="form-control" type="file" id="formFile"  onChange={onFileChange} />
										</div>
										{fileData()}
									</div>	
								</div>
					   			<div class="row mt-3">
								   <div class="col-6">
					   					{showLoading()}
									</div>
									<div class="col-6 text-end">
										
											<button class={showAnotherBtn()?"btn btn-danger m-2" :"btn btn-danger m-2 visually-hidden "} onClick={resetForm}>
              									Hacer otra carga!
            								</button>
								
					   						<button className={haveFile()?" btn btn-success m-2" :"btn btn-outline-success disabled m-2"} onClick={preEnvio}>
												Subir al servidor!
											</button>
										
									</div>
								</div>
								{showResultsTable()}
								
							</div>
						

				</div></div>
			</div>
			</div>
		);
	
}

export default Upload;
