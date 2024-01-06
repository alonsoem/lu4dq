import React from 'react';

import { useState,useEffect} from 'react';
import { getQsoList } from './api/api';
import {Form, Row} from "react-bootstrap";
import { saveAs } from 'file-saver';
import { useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';


function Checker() {

    const {station} = useParams();
	const [ qsos, setQsos] = useState([]);
	const [ callsign, setCallSign ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

 

    const navigateToStationQso = (corresponsal) => {
        if (station){
            navigate('/checker/'+station+'/'+corresponsal);
        }else{
            navigate('/checker/'+callsign+'/'+corresponsal);
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
    
    const downloadImage=(url)=>{
		saveAs(url, 'qsl.jpg');
	}

	const qsl = (qsl) =>{
		// eslint-disable-next-line
		if (qsl.status=="RC Confirmed"){
            var url ="https://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+qsl.document+"&chk="+qsl.chk;
			return (
                <badge class="badge text-bg-warning  text-center" role="button" onClick={()=>downloadImage(url)} >
                        Descargar QSL
                </badge>
            	);
        // eslint-disable-next-line
        }else if (qsl.status=="Confirmed"){
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
            <table class="table striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="text-center">Indicativo</th>
                        <th scope="col" class="text-center">Fecha</th>
                        <th scope="col" class="text-center">Hora</th>
                        <th scope="col" class="text-center">Banda</th>
                        <th scope="col" class="text-center">Modo</th>
                        <th scope="col" class="text-center">Qso / Qsl</th>
                    </tr>
                </thead>
            <tbody>
            {qsos.map((each) =>{
                 return ( 
                    <tr>
                    <td class="text-center"><span onClick={(r)=>navigateToStationQso(each.callsign)}>{each.callsign}</span></td>
                    <td class="text-center">{each.date}</td>
                    <td class="text-center">{each.time}</td>
                    <td class="text-center">{each.band}</td>
                    <td class="text-center">{each.mode}</td>
                    <td class="text-center">{qsl(each.qsl)}</td>
                  </tr>
                 )
            
                }   )}
        
        </tbody>
      </table>);
            }
      }
        
     }
  

    return (

            <div className="container d-flex ">

                <div className="container-fluid table-scroll-vertical col-11">
                <div className="card mt-3" >
                <div className="card-header headerLu4dq">
                            <span class="display-6 ">CONTROL DE CONTACTOS</span>       
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
    export default Checker;