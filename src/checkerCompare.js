import React from 'react';

import { useState,useEffect} from 'react';
import { getQsoCheck } from './api/api';
import {Col, Row} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useParams} from "react-router-dom";
import NavAdmin from './navAdmin';


function CheckerCompare() {

    const {station,toCallsign} = useParams();
	const [ qsos, setQsos] = useState([]);
	const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    

 

   
    useEffect(() => {
        console.log(station);
    
        setLoading(true);
        getQsoCheck({station:station,toCall:toCallsign})
        .then((response) => {
            
            setQsos(response.control);
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    
        // eslint-disable-next-line
        }, [station,toCallsign]
    )


    const handleBack =(event)=>{
        navigate('/status/checker/'+station);
    }
 

    
        
    
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
           
            
                    qsos.map((each) =>{
                        return ( 
                           <div class="card">
                            <div class="card-body">
                                   <div class="card">
                                   <div class="card-body">
                                       <Row>
                                       <Col>{each.qso.sta_from}</Col>
                                       <Col>{each.qso.sta_date}</Col>
                                       <Col>{each.qso.sta_time}</Col>
                                       <Col>{each.qso.sta_band}</Col>
                                       <Col>{each.qso.sta_mode}</Col>
                                       <Col>{each.qso.sta_rsts}</Col>
                                       <Col>{each.qso.sta_rstr}</Col>
                                       </Row>
                                   </div>
                               </div>
                          
       
                           <table class="table striped hover bordered responsive mt-3 border">
                           <thead>
                               <tr class="table-primary">
                                   <th scope="col" class="text-center">Indicativo</th>
                                   <th scope="col" class="text-center">Corresponsal</th>
                                   <th scope="col" class="text-center">Fecha</th>
                                   <th scope="col" class="text-center">Hora</th>
                                   <th scope="col" class="text-center">Banda</th>
                                   <th scope="col" class="text-center">Modo</th>
                                   <th scope="col" class="text-center">Rst Enviada</th>
                                   <th scope="col" class="text-center">Rst Recibida</th>
                                   
                               </tr>
                           </thead>
                               <tbody>
                               {each.maybeQso.map((may)=>{ 
                                   return (
                                       <tr class="table-primary">
                                           <td class="text-center">{may.to_from}</td>
                                           <td class="text-center">{may.to_to}</td>
                                           <td class="text-center">{may.to_date}</td>
                                           <td class="text-center">{may.to_time}</td>
                                           <td class="text-center">{may.to_band}</td>
                                           <td class="text-center">{may.to_mode}</td>
                                           <td class="text-center">{may.to_rsts}</td>
                                           <td class="text-center">{may.to_rstr}</td>
                  
                                       </tr>
                                   )
                                   })
                               }
                           </tbody>
                           </table>
                           </div>
                           </div>
                        )
                   
                           
       
                       }   )
                   
   
      
      
      );
            }
      }
        
     }
  

    return (

        <div>
        <NavAdmin />
            <div className="container d-flex ">

                <div className="container-fluid table-scroll-vertical col-11">
                <div className="card mt-3" >
                <div className="card-header headerLu4dq">
                            <span class="display-6 ">CONTROL DE CONTACTOS</span>       
                    </div>
                        <div className="card-body" >



                    
                            <ActivityTable />
                    
                    
                            <div className=" row float-end mt-4">
                                <div class="col-12 text-end">
                                    <button class="btn btn-success" onClick={handleBack}>Volver</button>
                                </div>
                                
                            </div>
                    
                    </div>
                    </div>

            
                </div>
            </div>
        </div>

        );

    }
    export default CheckerCompare;