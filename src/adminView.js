import React from 'react';

import { useState,useEffect} from 'react';
import { getStatusRank } from './api/api';


function AdminView() {

	const [ rank, setRank] = useState([]);
	
    const [ loading, setLoading ] = useState(false);

 
    useEffect(() => {
        
      
        loadData();
        
        // eslint-disable-next-line
        }, []
        )


    const loadData =()=> {
        
        setLoading(true);
        getStatusRank()
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
                            
                            <div className=" row float-end">
                                <div class="col-6 text-end">
                                   PROXIMAMENTE MAS....
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
    export default AdminView;