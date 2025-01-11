import React from 'react';

import { useState,useEffect} from 'react';
import { getAllActivities, getStations, putRecoveryOnQueueWithGet } from '../../api/api';
//import {useNavigate} from 'react-router-dom';

import {Form} from "react-bootstrap";
import NavAdmin from '../navAdmin';
import NavMenu from '../../nav';
import { ToastContainer, toast } from 'react-toastify';







function StationsList() {
    //const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ dataList, setDataList ] = useState([]);
    const [searchType, setSearchType] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [activities, setActivities] = useState([]);
    
    
    

    /*const navigateToUrl = (id) => {
        navigate('stations/'+id);
        
      };
  */
    useEffect(() => {
        
        updateData();
        return;
        // eslint-disable-next-line
        },[searchValue]
    )

    useEffect(() => {
        getAllActivities()
            .then((response) => {
                setActivities(response.activities);
            })
            .catch((response) => {
                handleAxiosError(response);
            });
        return;
        
        },[]
    )

    const updateData=()=>{
        setLoading(true);
        getStations({type:searchType,value:searchValue})
            .then((response) => {
                
                setDataList(response.stations);
                setLoading(false);
            })
            .catch((response) => {
                handleAxiosError(response);
                setLoading(false);
            });
    }

    const handleChangeSearchType= (event)=>{
        setSearchValue("");
        setDataList([]);
        setSearchType(event.target.value);
    }

    const handleChangeSearchValue=(event)=>{
        setSearchValue(event.target.value);
    }

    const handleChangeSearchByActivity=(event)=>{
        setSearchValue(event.target.value);
    }
   
    const handleAxiosError = (response) => {
        setLoading(false);
        //let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
        console.log("HANDLEAXIOSERROR");
        console.log(response);
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
            if (dataList && dataList.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY NADA POR EL MOMENTO...</h5>
                        </div>);
            }else{
        
                return (
            <table class="table striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="text-center">ESTACION</th>
                        <th scope="col" class="text-center">TITULAR</th>
                        <th scope="col" class="text-center">EMAIL</th>
                        <th scope="col" class="text-center">GRID LOCATOR</th>
                        <th scope="col" class="text-center">ITU</th>
                        <th scope="col" class="text-center">CQ ZONE</th>
                        <th scope="col" class="text-center">¿ES ACTUALIZABLE?</th>
                        <th scope="col" class="text-center">RECUPERO</th>
                        
                        
                        
                    </tr>
                </thead>
            <tbody>
            {dataList && dataList.map((each) =>{
                return ( 
                    <tr>
                    <td class="text-center">{each.station}</td>
                    <td class="text-center">{each.name}</td>
                    <td class="text-center">{each.email}</td>
                    <td class="text-center">{each.grid}</td>
                    <td class="text-center">{each.itu}</td>
                    <td class="text-center">{each.cqzone}</td>
                    <td class="text-center">{each.updateable==="true"?"SI":"NO"}</td>
                    <td class="text-center">
                        <span  class="text-success" 
                                style={{ cursor: 'pointer'}} 
                                onClick={() =>handleRecovery(each.station)}>
                                    ENVIAR
                        </span>
                    </td>
                    </tr>
                 )
                 
                }   
            )}
        
        </tbody>
      </table>);
            }
      }
        
     }

      
    
    

     /*const navigateAddActivity = () => {
      
          navigate('/rcpanel/ABM');    
      
    };*/
  

    return (
            <div>
                <NavMenu />
                <NavAdmin />
            
                <div className="container d-flex ">
                    <div className="container-fluid table-scroll-vertical col-11">
                        <div className="card mt-3" >
                            <div className="card-header headerLu4dq">
                                <span class="display-6 ">ADMINISTRACION DE ESTACIONES</span>       
                            </div>
                            <div className="card-body" >

                                <div className="card mt-3 p-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                                
                                    <div className="card-body row col-12" >
                                        <div className="row rowForm col-10">
                                        
                                            <div className="col-3">
                                                <Form.Group className="mb-3" controlId="toCall2Value">
                                                    <Form.Label>Tipo de busqueda</Form.Label>
                                                    <select onChange={handleChangeSearchType} value={searchType} className={"form-select"
                                                    }>
                                                    <option selected disabled value="">Elija un tipo de busqueda...</option>
                                                    
                                                    <option value={0}>Por distintiva</option>
                                                    <option value={1}>Por actividad</option>
                                                    <option value={2}>Por nombre</option>
                                                    
                                                </select>
                                                </Form.Group>

                                                
                                            </div>
                                            <div className="col-7">
                                                <Form.Group className="mb-3" controlId="toCall2Value">
                                                <Form.Label>Valor a buscar</Form.Label>
                                                { 
                                                
                                                // eslint-disable-next-line 
                                                searchType==1?
                                                    
                                                        <select onChange={handleChangeSearchByActivity} className={"form-select"}>
                                                            <option selected disabled value="">Elija una actividad...</option>
                                                            {activities && activities.map(each=>{
                                                                return(
                                                                <option value={each.id}>{each.title}</option>    
                                                                );
                                                                })
                                                            }
                                                        
                                                        
                                                        </select>
                                                    
                                                
                                                    
                                                :
                                                
                                                    <Form.Control  onChange={handleChangeSearchValue} value={searchValue} 
                                                                    className={"form-control"}
                                                                    />
                                                    

                                                 
                                                    
                                                }
                                                </Form.Group>

                                                
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
    export default StationsList;