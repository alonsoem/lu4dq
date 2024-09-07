import React from 'react';

import { useState,useEffect} from 'react';
import { getDocuments } from '../../api/api';
import {useNavigate} from 'react-router-dom';
import NavAdmin from '../navAdmin';
import NavMenu from '../../nav';



export default function DocAdmin() {
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ items, setItems ] = useState([]);
    
    

    const navigateToUrl = (id) => {
        navigate(''+id);
        
      };
  
    useEffect(() => {
        
        getDocuments()
            .then((response) => {
                setItems(response.documents);
                console.log(response);
                
                setLoading(false);
            })
            .catch((error) => handleAxiosError(error));

        return;
        
        },[]
    )

  
   
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
    

	



    function Table(){
      
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
            if (items.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY NADA POR EL MOMENTO...</h5>
                        </div>);
            }else{
        
                return (
            <table class="table striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
                        <th scope="col" class="text-center">ID</th>
                        <th scope="col" class="text-center">TITULO</th>
                    </tr>
                </thead>
            <tbody>
            {items.map((each) =>{
                 return ( 
                    <tr>
                    <td class="text-center">{each.id}</td>
                    <td class="text-center">
                        <span class="btn-link link-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" onClick={(r)=>navigateToUrl(each.id)} >
                            {each.description}
                        </span>
                    </td>
                    
                    </tr>
                 )
                 
                }   )}
        
        </tbody>
      </table>);
            }
      }
        
     }

      
    
    

     const navigateAdd = () => {
      
          navigate('/rcpanel/doc/new');    
      
    };
  

    return (
            <div>
                <NavMenu />
                <NavAdmin />
            
            <div className="container d-flex ">
            
                <div className="container-fluid table-scroll-vertical col-11">
                    <div className="card mt-3" >
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">ADMINISTRACION DE DOCUMENTOS</span>       
                        </div>
                        <div className="card-body" >

                            <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                            
                                    <div className="card-body" >
                                        <div className="row rowForm">
                                        <div className=" row mb-3 col-10"></div>
                                            <div className=" row mb-3 col-2">
                                                <button class="btn btn-primary" onClick={navigateAdd}>NUEVO DOCUMENTO</button>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                  
                          <Table />
                        </div>
                    </div>
                </div>
            </div>
</div>
        );

    }