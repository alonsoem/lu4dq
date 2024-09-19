import React from 'react';

import { useState,useEffect} from 'react';
import { getStations,setStatus } from '../../api/api';
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import {Form,Row} from "react-bootstrap";
import NavAdmin from '../navAdmin';
import NavMenu from '../../nav';




function StationsList() {
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ dataList, setDataList ] = useState([]);
    const [ statusUpdate, setStatusUpdate ] = useState(0);
    const [searchType, setSearchType] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    
    

    const navigateToUrl = (id) => {
        navigate('stations/'+id);
        
      };
  
    useEffect(() => {
        
        updateData();
        return;
        
        },[statusUpdate]
    )

    const updateData=()=>{
        setLoading(true);
        getStations({type:searchType,value:searchValue})
            .then((response) => {
                console.log(response.stations);
                setDataList(response.stations);
                setLoading(false);
            })
            .catch((response) => {
                handleAxiosError(response);
                setLoading(false);
            });
    }
    const handleChangeSearchType= (event)=>{
        setSearchType(event.target.value);
        updateData();
    }
    const handleChangeSearchValue=(event)=>{
        setSearchValue(event.target.value);
        updateData();
    }


    const handleChangeStatus = (id,status)=>{
        setStatus(
            {
                id:id,
                // eslint-disable-next-line
                setTo:(status==0?1:0)
            }
        )
        .then((response) => {
            console.log(response);
            setStatusUpdate(statusUpdate+1);
        }
        
        )
        .catch();
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
    

	



    function ActivityTable(){

        const showEnabled =(id,enabled)=>{

          // eslint-disable-next-line
          if (enabled==1){
            return <span  class="text-success" style={{ cursor: 'pointer'}} onClick={() =>handleChangeStatus(id,enabled)}><FontAwesomeIcon   icon={icon({name: 'eye'})}  title="Click para cambiar el estado" 
            onClick={handleChangeStatus} /></span>;
          }else{
            return <span  class="text-danger " style={{ cursor: 'pointer' }} onClick={()=> handleChangeStatus(id,enabled)}><FontAwesomeIcon   icon={icon({name: 'eye-slash'})}  title="Click para cambiar el estado" 
                
            /></span>;
            
          }
        }

   
        
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
                        <th scope="col" class="text-center">¿ES ACTUALIZABLE?</th>
                        
                        
                        
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
                    <td class="text-center">{each.updateable=="true"?"SI":"NO"}</td>
                    
                    </tr>
                 )
                 
                }   
            )}
        
        </tbody>
      </table>);
            }
      }
        
     }

      
    
    

     const navigateAddActivity = () => {
      
          navigate('/rcpanel/ABM');    
      
    };
  

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
                                                    <Form.Control  onChange={handleChangeSearchValue} value={searchValue} 
                                                                    className={"form-control"}
                                                                    />
                                                    

                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <button class="btn btn-primary" onClick={navigateAddActivity}>NUEVA ESTACIÓN</button>
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