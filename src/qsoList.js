import React from 'react';

import { useState,useEffect} from 'react';
import { getQsoList } from './api/api';
import {Form, Row} from "react-bootstrap";
import { saveAs } from 'file-saver';
import { useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';





function QsoList() {

    const {station} = useParams();
	const [ qsos, setQsos] = useState([]);
	const [ callsign, setCallSign ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();


    const navigateToStationQso = (station) => {
        if (station){
            navigate('/qsoList/'+station);
        }
    };

 
    useEffect(() => {
        console.log(station);
        if (station){
           setCallSign(station);
           loadData(station);
        }
        // eslint-disable-next-line
        }, [station]
        )

    const handleSearch =()=>{
        loadData(callsign);
    }

    const loadData =(callId)=> {
        
        setLoading(true);
        getQsoList({station:callId})
        .then((response) => {
            
            setQsos(response.qsos);
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }
    const handleChangeCallsign = (event) => {
        setCallSign(event.target.value);
        

    };
    const handleAxiosError = (response) => {
        setLoading(false);
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
    
    const downloadImage=(url,fileName)=>{
		saveAs(url, fileName);
	}

	const qsl = (qso) =>{
		// eslint-disable-next-line
		if (qso.qsl.status=="RC Confirmed"){
            		var url ="https://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+qso.qsl.document+"&chk="+qso.qsl.chk;
			const fileName='qsl.jpg';
			const fileName2=qso.station+"_"+qso.callsign+"_"+qso.date.replace(/-/gi,"")+"_"+qso.time.replace(/:/gi,"")+".jpg";
			console.log (fileName2);
			
			return (
                <badge class="badge text-bg-warning  text-center" role="button" onClick={()=>downloadImage(url,fileName)} >
                        Descargar QSL
                </badge>
            	);
        // eslint-disable-next-line
        }else if (qso.qsl.status=="Confirmed"){
            return ("Confirmado");
		}else{
			return "-";
		}
    }



    function ActivityTable(){
        
        if (loading){
                return (<div class="card p-5 mt-3">
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                        <p class="m-2"> Aguarde un instante...</p>
                    </div>
                    </div>);
        }else{
            if (qsos.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY NADA POR EL MOMENTO...</h5>
                            <p>Busca un indicativo para ver los contactos cargados!</p></div>);
            }else{
        
                return (
            <table class="table block striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="text-center">Indicativo</th>
                        <th scope="col" class="text-center">Fecha</th>
                        <th scope="col" class="text-center d-none d-sm-table-cell">Hora</th>
                        <th scope="col" class="text-center ">Banda</th>
                        <th scope="col" class="text-center d-none d-lg-table-cell">Modo</th>
                        <th scope="col" class="text-center d-none d-lg-table-cell ">Swl</th>
                        <th scope="col" class="text-center">Qso / Qsl</th>
                    </tr>
                </thead>
            <tbody>
            {qsos.map((each) =>{
                 return ( 
                    <tr>
                    <td class="text-center">
                        <badge  onClick={(r)=>navigateToStationQso(each.callsign.match(/[A-Za-z0-9]+/))}>
                            {each.swl?each.callsign+" - "+each.callsign2:each.callsign}
                        </badge>
                    </td>
                    <td class="text-center">{each.date}</td>
                    <td class="text-center d-none d-sm-table-cell">{each.time}</td>
                    <td class="text-center">{each.band}</td>
                    <td class="text-center d-none d-lg-table-cell">{each.mode}</td>
                    <td class="text-center d-none d-lg-table-cell">{each.swl?"SI":"-"}</td>
                    <td class="text-center">{qsl(each)}</td>
                  </tr>
                 )
            
                }   )}
        
        </tbody>
      </table>);
            }
      }
        
     }
     

    return (

            <div className="container-fluid d-flex ">

                <div className="container-fluid table-scroll-vertical col-12">
                <div className="card mt-3" >
                    <div className="card-header headerLu4dq ">
                            <span class="display-6 ">CONSULTA DE CONTACTOS</span>       
                            <span class="lead fs-3 text text-break">  y descarga de QSL</span>       
                    </div>
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
