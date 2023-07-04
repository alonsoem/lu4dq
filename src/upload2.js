import {postFile} from "./api/api";
import {useRef, useState} from 'react';


	function Upload(){

		const [ selectedFile, setFile ] = useState(null);
		const [ filas, setFilas ] = useState([]);
		const [ response, setResponse ] = useState(false);
		const [ responseError,setResponseError ] = useState(false);
		const [ error,setError ] = useState(false);
		const inputRef = useRef(null);

	

		// On file select (from the pop up)
		const onFileChange = event => {
			setFile(event.target.files[0] );
		};

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

		// Details of the uploaded file
		//		console.log(this.state.selectedFile);

		// Request made to the backend api
		// Send formData object
		//axios.post("http://lu4dq.qrits.com.ar/api/postFile.php", formData);
		postFile(formData)
			.then(res=>	{
							showResults(res);
							//this.setState({selectedFile:null});
			}
			)
			.catch((res)=>{
				console.log ("ERROR actualizando la DB");
				console.log (res);
				setError(true);
				if (res.response.data.status=="ERROR_UPLOADING"){
					setResponseError("No se pudo subir el archivo al servidor!");
				}else if (res.response.data.status=="ERROR_PROCESSING"){
					setResponseError("Ocurrió un error procesando el archivo!");
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

	const fileData = () => {

		if (selectedFile) {
			return (
				
				<div>
					<h2>Detalles:</h2>
					<p>Nombre: {selectedFile.name}</p>
					<p>
						Última modificación:{" "}
						{selectedFile.lastModifiedDate.toDateString()}
					</p>
					<p>
						Tamaño:{" "}
						{selectedFile.size.toString()}
					</p>

				</div>
			);
		/*} else {
			return (
				<div>
					pepe
				</div>
			);
			*/
		}
	};
	/*<br />
					<h4>Elija un archivo y luego presione el boton "Subir al servidor"</h4>*/

	const showBadgeMov = (value) => {
		// eslint-disable-next-line
		if (value=="OK"){
			return <span class="badge bg-success">{value}</span>
		// eslint-disable-next-line
		}else if (value=="duplicate"){
			return <span class="badge bg-warning">{value}</span>
		}else{
			return <span class="badge bg-danger">{value}</span>
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
				<div  className="col-12 mt-3">
					<table className="table striped hover bordered responsive">
					<thead>
						<tr>
							<th>Movimiento</th>
							<th>Indicativo</th>
							<th>Fecha</th>
							<th>Hora</th>
	  					</tr>
					</thead>
					<tbody className="col-12">
									{filas.map(
									(r)=>(
											<tr  className="col-12">
												<td className="col-2">{showBadgeMov(r.insert)}</td>
												<td className="col-4">{r.data.callsign}</td>
												<td className="col-3">{r.data.date}</td>
												<td className="col-3">{r.data.time}</td>
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

	const haveFile=()=>{
		//habilita boton si hay archivo seleccionado y return es falso
		return selectedFile!=null && response==false;
	}
	const haveReturned=()=>{
		console.log (response);
		return response==true;
	}

	const showAnotherBtn=()=>{
		return response==true;
	}
	const resetForm=()=>{
		/*this.setState({return:false});
		this.setState({selectedFile:null});*/
		setResponse(false);
		setFile(null);
		resetFileInput();
	}

	
	
	
	

	const resetFileInput = () => {
		// resetting the input value
		inputRef.current.value = null;
		
	};

		return (
			<div className="container d-flex gap-3 p-3">
			<div className="container col-10">

				
				<div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                		<div className="card-body" >


							<div className="card-body" >

								<h1>
									Incluir un archivo ADIF 

								</h1>
								<div className="mt-3 ">
									
									<div className={haveReturned()?"card p-3 visually-hidden" :"card p-3"} >
										<div class=" mb-3">
  											<label for="formFile" class="form-label"><h4>Elija un archivo y luego presione el boton "Subir al servidor"</h4></label>
  											<input  ref={inputRef} class="form-control" type="file" id="formFile"  onChange={onFileChange} />
										</div>
										{fileData()}
									</div>	
								</div>

								<div className="text-right mt-3">
								<button class={showAnotherBtn()?"btn btn-danger m-2" :"btn btn-sanger m-2 visually-hidden "} onClick={resetForm}>
              						Hacer otra carga!
            					</button>
								
								
									<button className={haveFile()?"btn btn-success m-2" :"btn btn-outline-success disabled m-2"} onClick={onFileUpload}>
										Subir al servidor!
									</button>
								</div>

								{showResultsTable()}
							</div>
						

				</div></div>
			</div>
			</div>
		);
	
}

export default Upload;
