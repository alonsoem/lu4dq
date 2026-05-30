import React from 'react';

import { useState,useEffect} from 'react';
import { getContestStations } from '../../api/api';
//import {useNavigate} from 'react-router-dom';

//rm} from "react-bootstrap";
import NavAdmin from '../navAdmin';
import NavMenu from '../../nav';








function ContestPanel() {
    //const navigate = useNavigate();
    
    const [loading, setLoading ] = useState(false);
    const [dataList] = useState([]);
    const [groupList] = useState([]);
     
   
    useEffect(() => {
        setLoading(true);
        getContestStations({value:127})
            .then((response) => {
               
               response.forEach(function (item, index, arr){
                    dataList.push(item.values);
                    groupList.push(item.category);
                });
                
                
                setLoading(false);

            })
            .catch((response) => {
                handleAxiosError(response);
                setLoading(false);
            });

        },[dataList,groupList]
    )

   
   
    const handleAxiosError = (response) => {
        setLoading(false);
        //let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
        console.log("HANDLEAXIOSERROR");
        //console.log(response);
            // eslint-disable-next-line
        /*if (response.response.data.code==1062 ) {
              //errorToDisplay = "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS.";
            }
        // eslint-disable-next-line
        if (response.message=="Network Error") {
          //errorToDisplay = "Error de red!. Reintente a la brevedad";
        }
    */
        //setError(errorToDisplay);
        //notifyError(errorToDisplay);
      }
    


//nuevo
/*
const handleRecovery = (station)=>{
    putRecoveryOnQueueWithGet(
            {
                station: station   }
        )
        .then((response) => {
            console.log(response);
            
        }
        
        )
        .catch();
    }

   
    const navigateToUrl = (id) => {
        navigate(encodeURIComponent(id));
        
      };
  */

    const ActivityTable=()=>{
        
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
            if (groupList && groupList.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY NADA POR EL MOMENTO...</h5>
                        </div>);
            }else{
                
                return( groupList.map((a,index)=>{
                                    
                    return (
                            <div class="card mt-3">
                                <h5 class="card-title">{a}</h5>
                                <PrintDataList data={dataList[index]} />
                            </div>
                    );
                        
                    


                }));
            }
        }
        
    }

     const PrintDataList=(props)=>{
        if (props.data && props.data.length>0){
            return (
            <table class="table striped hover bordered responsive mt-3 border">
            <thead>
                <tr class="table-primary">
                    <th scope="col" class="text-center">
                        ESTACION
                    </th>
                    
                    <th scope="col" class="text-center">TITULAR</th>
                    <th scope="col" class="text-center">EMAIL</th>
                    <th scope="col" class="text-center">GRID LOCATOR</th>
                    <th scope="col" class="text-center">ITU</th>
                    <th scope="col" class="text-center">CQ ZONE</th>
                    
                    
                    
                    
                </tr>
            </thead>
            <tbody>

            {props.data.map(a=> {
                return (
                        <tr class="table-primary">
                                <td  class="text-center">
                                    {a.station}
                                </td>
                                
                                <td  class="text-center">{a.name}</td>
                                <td  class="text-center">{a.email}</td>
                                <td  class="text-center">{a.grid}</td>
                                <td  class="text-center">{a.itu}</td>
                                <td  class="text-center">{a.cqzone}</td>
                                
                            </tr>
                        
 
                )
          
                        

            }
            )}
                  </tbody>
                  </table>
                  );
            
        }else{
            return ("NO HAY NADA AQUI");
        }
    }
    
    return (
            <div>
                <NavMenu />
                <NavAdmin />
            
                <div className="container d-flex ">
                    <div className="container-fluid table-scroll-vertical col-11">
                        <div className="card mt-3" >
                            <div className="card-header headerLu4dq">
                                <span class="display-6 ">ADMINISTRACION DE CONCURSO</span>       
                            </div>
                            <div className="card-body" >

                                <div className="card mt-3 p-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                                
                                    <div className="card-body row col-12" >
                                        <div className="row rowForm col-10">
                                        

                                            <div className="col-7">
                                                Aca se mostraran los concursos para poder seleccionarlos y manejar la parametria. Ahora puntualmente esta HARDCODEADO para resolver mas rapido.
                                                
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            &nbsp;
                                            {/*<button class="btn btn-primary" onClick={navigateAddActivity}>NUEVA ESTACIÓN</button>*/}
                                        </div>  
                                    </div>
                                        
                                </div>
                                <ActivityTable />
                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
    export default ContestPanel;