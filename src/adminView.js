import React from 'react';

import { useState,useEffect} from 'react';
import { getActivities, getStatsByBand, getStatsByMode, getStatusRank } from './api/api';
import {Form, Row} from "react-bootstrap";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';



ChartJS.register(ArcElement, Tooltip, Legend);

function AdminView() {

	const [ rank, setRank] = useState([]);
	
    const [ loading, setLoading ] = useState(false);
    const [ activities, setActivities ] = useState([]);
    const [ activity, setActivity ] = useState(null);
    const [ modeLabels, setModeLabels ] = useState([]);
    const [ modeData, setModes ] = useState([]);
    const [ bandLabels, setBandLabels ] = useState([]);
    const [ bandData, setBands ] = useState([]);

    const dataModes = {
        labels: modeLabels,
        datasets: [
          {
            label: 'Cantidad',
            data: modeData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const dataBands = {
        labels: bandLabels,
        datasets: [
          {
            label: 'Cantidad',
            data: bandData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
     
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
            loadPieModes(activity);
            loadPieBands(activity);
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

    const loadPieModes =(activityId)=> {
        
        setLoading(true);
        getStatsByMode({id:activityId})
        .then((response) => {
            
            setModeLabels(response.statsByMode.map(aMode=>aMode.mode));
            setModes(response.statsByMode.map(aMode=>aMode.qty));
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }

    const loadPieBands =(activityId)=> {
        
        setLoading(true);
        getStatsByBand({id:activityId})
        .then((response) => {
            console.log(response);
            setBandLabels(response.statsByBand.map(aBand=>aBand.band));
            setBands(response.statsByBand.map(aBand=>aBand.qty));
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
                    
                    
                            <div class="card p-5 mt-3">
                                <Row class="">
                                    <div class="text-center">
                                        <Pie data={dataModes} />
                                    </div>
                                </Row>
                            </div>

                            <div class="card p-5 mt-3">
                                <Row class="">
                                    <div class="text-center">
                                        <Pie data={dataBands} />
                                    </div>
                                </Row>
                            </div>
                    
                    </div>
                    

                  
                    



                    
                    </div>

            
                </div>
            </div>

        );

    }
    export default AdminView;