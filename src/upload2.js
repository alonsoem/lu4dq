import {postFile} from "./api/api";
import React, { Component } from 'react';


class uploadBis extends Component {

	state = {
		selectedFile: null,
		filas:[],
		return:false,
	};

	// On file select (from the pop up)
	onFileChange = event => {

		// Update the state
		this.setState({ selectedFile: event.target.files[0] });

	};

	// On file upload (click the upload button)
	onFileUpload = () => {

		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"file",
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		//		console.log(this.state.selectedFile);

		// Request made to the backend api
		// Send formData object
		//axios.post("http://lu4dq.qrits.com.ar/api/postFile.php", formData);
		postFile(formData)
			.then(res=>	{this.showResults(res);
			}
			)
			.catch(()=>{
				console.log ("ERROR actualizando la DB");
			}
			);
		
	}

	showResults=(res)=>{
		console.log(res.rows);
		this.setState({return:true});
		this.setState({filas:res.rows});


	}

	// File content to be displayed after
	// file upload is complete
	fileData = () => {

		if (this.state.selectedFile) {

			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {this.state.selectedFile.name}</p>
					<p>
						Last Modified:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>

				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	};

	showBadgeMov = (value) => {
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
	showResultsTable = () => {
		// eslint-disable-next-line
		if (this.state.return==true) {

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
									{this.state.filas.map(
									(r)=>(
											<tr  className="col-12">
												<td className="col-2">{this.showBadgeMov(r.insert)}</td>
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
	};

	


	render() {

		return (
			<div className="container d-flex gap-3 p-3">
			<div className="container col-10">

				
				<div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                		<div className="card-body" >


							<div className="card-body" >
								<h1>
									Incluir un archivo ADIF 

								</h1>

								
			
								<div className="mt-3">
									
									<div className="card">
										<input type="file" onChange={this.onFileChange}   />
										{this.fileData()}
									</div>	
								</div>
								<div className="text-right mt-3">
									<button className="btn btn-success" onClick={this.onFileUpload}>
										Upload!
									</button>
								</div>

								{this.showResultsTable()}
							</div>
						

				</div></div>
			</div>
			</div>
		);
	}
}

export default uploadBis;
