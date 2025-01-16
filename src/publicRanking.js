import React from 'react';

import { useState,useEffect} from 'react';
import { getGlobalStatsByBand, getGlobalStatsByMode, getGlobalStatusRank} from './api/api';
import {Row} from "react-bootstrap";
import { Pie } from 'react-chartjs-2';
import NavMenu from './nav';

//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';



ChartJS.register(ArcElement,  CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);

function AdminView() {

	const [ rank, setRank] = useState([]);
	
    const [ loading, setLoading ] = useState(false);
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
        
            loadData();
            loadPieModes();
            loadPieBands();
        
        
        // eslint-disable-next-line
        }, []
    )        


    

    const loadData =(activityId)=> {
        console.log(activityId);
        setLoading(true);
        getGlobalStatusRank()
        .then((response) => {
            
            setRank(response.rank);
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }

    const loadPieModes =(activityId)=> {
        
        setLoading(true);
        getGlobalStatsByMode()
        .then((response) => {
            
            setModeLabels(response.statsByMode.map(aMode=>aMode.mode));
            setModes(response.statsByMode.map(aMode=>aMode.qty));
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }

    const loadPieBands =(activityId)=> {
        
        setLoading(true);
        getGlobalStatsByBand()
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
                            <h5>NO PUDIMOS CARGAR LOS DATOS EN ESTE MOMENTO...</h5>
                            <p>Intentá en un breve momento de tiempo.</p></div>);
            }else{
        
                return (
            <table class="table striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="text-center">Posición</th>
                        <th scope="col" class="text-center">Indicativo</th>
                        <th scope="col" class="text-center">Nombre</th>
                        <th scope="col" class="text-center">QSOs</th>
                        
                    </tr>
                </thead>
            <tbody>
            {rank.map((each) =>{
              
                 return ( 
                    <tr>
                      <td class="text-center">{each.position}</td>
                    <td class="text-center">{each.station}</td>
                    <td class="text-center">{each.name}</td>
                    <td class="text-center">{each.qty}</td>
                    </tr>
                 )
            
                }   )}
        
        </tbody>
      </table>);
            }
      }
        
     }
  

    return (
      
      <div>
        <NavMenu />
      

            <div className="container d-flex ">
                <div className="container-fluid table-scroll-vertical col-11">
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">RANKING LU4DQ Log</span>       
                        </div>
                        <div className="card-body" >


                    
                            <ActivityTable />
                    
                    
                            <div class="card mt-3">
                              <div className="card-header ">
                                <span class="display-6 ">Otras Estadísticas</span>       
                              </div>
                              
                                <Row class="col-12 container flex">
                                    <div class="text-center col-6 p-4 ">
                                        <div class="card mt-3">
                                            <div className="card-header ">
                                              <span class="display-10 ">Distribución por modos</span>       
                                            </div>
                                            <Pie data={dataModes} />
                                       </div>
                                    </div>
                                    <div class="text-center col-6 p-4">
                                    <div class="card mt-3">
                                    <div className="card-header ">
                                          <span class="display-10 ">Distribución por bandas</span>       
                                            
                                            </div>
                                            <Pie data={dataBands} />
                                        </div>
                                    </div>
                                </Row>
                            </div>

                            
                          
                    
                    </div>
  
                    </div>

            
                </div>
            </div>
        </div>

        );

    }
    export default AdminView;