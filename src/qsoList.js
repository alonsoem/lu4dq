import React from 'react';

import { useState} from 'react';
import { getQsoList } from './api/api';
import {Form, Row} from "react-bootstrap";
import { saveAs } from 'file-saver';


function QsoList() {

	const [ qsos, setQsos] = useState([]);
	const [ callsign, setCallSign ] = useState("");

 
    const handleSearch =()=>{
        getQsoList({station:callsign})
        .then((response) => {
            setQsos(response.qsos);
          
      })
      .catch((response) => handleAxiosError(response));
    
    }
    const handleChangeCallsign = (event) => {
        setCallSign(event.target.value);
        

    };
    const handleAxiosError = (response) => {
        //let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
        console.log("HANDLEAXIOSERROR");
        console.log(response);
            // eslint-disable-next-line
        if (response.response.data.code==1062 ) {
              //errorToDisplay = "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS.";
            }
        // eslint-disable-next-line
        if (response.message=="Network Error") {
          //errorToDisplay = "Error de red!. Reintente a la brevedad";
        }
    
        //setError(errorToDisplay);
        //notifyError(errorToDisplay);
      }
    
    const downloadImage=(url)=>{
		saveAs(url, 'qsl.jpg');
	}

	const qsl = (qsl) =>{
		// eslint-disable-next-line
		if (qsl.status=="RC Confirmed"){
			return (<button className="btn btn-success btn-sm" onClick={r=>
				downloadImage("http://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+qsl.document+"&chk="+qsl.chk)}>
					Descargar QSL
			</button>	);
        // eslint-disable-next-line
        }else if (qsl.status=="Confirmed"){
            return ("Confirmado");
		}else{
			return "-";
		}
    }



    function ActivityTable(){
        return (
            <table class="table striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
                        <th scope="col">Indicativo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Banda</th>
                        <th scope="col">Modo</th>
                        <th scope="col">Qsl</th>
                    </tr>
                </thead>
            <tbody>
            {qsos.map((each) =>{
                 return ( 
                    <tr>
                    <td >{each.callsign}</td>
                    <td >{each.date}</td>
                    <td >{each.time}</td>
                    <td >{each.band}</td>
                    <td >{each.mode}</td>
                    <td >{qsl(each.qsl)}</td>
                  </tr>
                 )
            })}
        
 
 
        </tbody>
      </table>);
        
     }
  

    return (

            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid table-scroll-vertical gap-3 col-11">
                <div className="card mt-3" >
                        <div className="card-header bg-primary text-white text-center display-5"  >Consulta de contactos</div>
                        <div className="card-body" >


                    <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                        <div className="card-body" >
                            <Row className="mb-3">
                               
                                <Form.Group className="mb-3" controlId="callSignValue">
                                    <Form.Label>INDICATIVO</Form.Label>
                                    <Form.Control onChange={handleChangeCallsign}  value={callsign} type="text"
                                        className="form-control" />
                               </Form.Group>
                               
                               

                                
                            </Row>
                            <div className=" row float-end">
                                <div class="col-6 text-end">
                                    <button class="btn btn-success" onClick={handleSearch}>Buscar</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    

                    
                            <ActivityTable />
                    
                    
                    
                    </div>
                    </div>

            
                </div>
            </div>

        );

    }
    export default QsoList;