import React from 'react';

import { useState,useEffect} from 'react';
import { getAllActivities } from './api/api';
import {useNavigate} from 'react-router-dom';





function Admin() {
  const navigate = useNavigate();

	
	
    const [ loading, setLoading ] = useState(false);
    const [ activities, setActivities ] = useState([]);
  
   

    useEffect(() => {
        
        getAllActivities()
            .then((response) => {
            
                setActivities(response.activities);
                setLoading(false);
          
            })
            .catch((response) => handleAxiosError(response));

        return;
        
        // eslint-disable-next-line
        }, []
        )

   
   

   
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

        const showEnabled =(enabled)=>{
          // eslint-disable-next-line
          if (enabled==1){
            return "SI";
          }else{
            return "NO";
          }
        }

        const showType =(type)=>{
        // eslint-disable-next-line
          if (type==1){
            return "CERTIFICADO";
          }else{
            return "QSL ESPECIAL";
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
            if (activities.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY NADA POR EL MOMENTO...</h5>
                        </div>);
            }else{
        
                return (
            <table class="table striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="text-center">id</th>
                        <th scope="col" class="text-center">Habilitada</th>
                        <th scope="col" class="text-center">Tipo</th>
                        <th scope="col" class="text-center">Titulo</th>
                        
                        
                    </tr>
                </thead>
            <tbody>
            {activities.map((each) =>{
                 return ( 
                    <tr>
                    <td class="text-center">{each.id}</td>
                    <td class="text-center">{showEnabled(each.enabled)}</td>
                    <td class="text-center">{showType(each.type)}</td>
                    <td class="text-center">{each.title}</td>
                    </tr>
                 )
            
                }   )}
        
        </tbody>
      </table>);
            }
      }
        
     }

      
    
    

     const navigateAddActivity = () => {
      
          navigate('/status/admin/ABM');    
      
    };
  

    return (

            <div className="container d-flex ">
                <div className="container-fluid table-scroll-vertical col-11">
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">ADMINISTRACION DE ACTIVIDADES</span>       
                        </div>
                        <div className="card-body" >

                            <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                            
                                    <div className="card-body" >
                                        <div className="row rowForm">
                                        <div className=" row mb-3 col-10"></div>
                                            <div className=" row mb-3 col-2">
                                                <button class="btn btn-primary" onClick={navigateAddActivity}> NUEVO</button>
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
    export default Admin;