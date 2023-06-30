import {postFile} from "./api/api";
import {Col, Row} from "react-bootstrap";
import React, { Component } from 'react';

class uploadBis extends Component {

	state = {

		// Initially, no file is selected
		selectedFile: null,
		filas:[]
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

	render() {

		return (
			<div>
				<h1>
					Upload a File

				</h1>
		
				<div>
					<input type="file" onChange={this.onFileChange} />
					<button onClick={this.onFileUpload}>
						Upload!
					</button>
				</div>
				{this.fileData()}

				<div>
					{this.state.filas.map(
						(r)=>(
						<Row >
							<Col>{r.insert}</Col>
							<Col>{r.data.callsign}</Col>
							<Col>{r.data.date}</Col>
							<Col>{r.data.time}</Col>

						</Row>
						)
					)}
						
				</div>
			</div>
		);
	}
}

export default uploadBis;
