import React from 'react';

import { useState,useEffect} from 'react';
import { getActivities, getStatusRank } from './api/api';
import {Form, Row} from "react-bootstrap";


function AdminView() {

	const [ rank, setRank] = useState([]);
	
    const [ loading, setLoading ] = useState(false);
    const [ activities, setActivities ] = useState([]);
    const [ activity, setActivity ] = useState(null);

 
    useEffect(() => {
        
        getActivities()
            .then((response) => {
            
                setActivities(response.activities);
                setLoading(false);
          
            })
            .catch((response) => handleAxiosError(response));

        return;
        
        // eslint-disable-next-line
        }, []
        )

    useEffect(() => {
        
        if (activity){
            loadData(activity);
        }
        
        // eslint-disable-next-line
        }, [activity]
    )        


    const handleChangeActivity=(event)=>{
            console.log(event.target.value);
            setActivity(event.target.value);

    }

    const loadData =(activityId)=> {
        console.log(activityId);
        setLoading(true);
        getStatusRank({id:activityId})
        .then((response) => {
            
            setRank(response.rank);
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
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
            if (rank.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY NADA POR EL MOMENTO...</h5>
                            <p>Busca un indicativo para ver los contactos cargados!</p></div>);
            }else{
        
                return (
            <table class="table striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="text-center">Indicativo</th>
                        <th scope="col" class="text-center">Cantidad Total</th>
                        <th scope="col" class="text-center">Cantidad entre Fechas</th>
                        
                    </tr>
                </thead>
            <tbody>
            {rank.map((each) =>{
                 return ( 
                    <tr>
                    <td class="text-center">{each.station}</td>
                    <td class="text-center">{each.qty}</td>
                    <td class="text-center">{each.actQty}</td>
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
                            <span class="display-6 ">CONTACTOS POR ACTIVIDAD</span>       
                            
                    </div>
                        <div className="card-body" >


                    <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                        <div className="card-body" >
                            <div className="row rowForm">
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="bandValue">
                                <Form.Label>ACTIVITY</Form.Label>
                                    <select id="activity" onChange={handleChangeActivity} >
                                        <option selected disabled value="">Elija una actividad...</option>
                                        {
                                            activities.map(anAct => 
                                                    <option value={anAct.id}>{anAct.title}</option>
                                                )
                                        }
                                       </select>
                                </Form.Group>
                            </Row>  
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
    export default AdminView;