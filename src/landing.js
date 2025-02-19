import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import {Alert} from "react-bootstrap";
import NavMenu from './nav';

export default function Landing(props) {
    
    const {stationCode} = useParams();
    const navigate = useNavigate();

    const navigateManual = () => {
        if (stationCode===undefined){
            navigate('/cargaManual/');    
        }else{
            navigate('/cargaManual/'+stationCode);
        }
      };

    const navigateMultiple = () => {
        if (stationCode===undefined){
            navigate('/cargaMasiva/');    
        }else{
            navigate('/cargaMasiva/'+stationCode);
        }
    };
    const WelcomeBanner = () =>{
        // eslint-disable-next-line
        if (sessionStorage.getItem("userLoginOK")==1) {
            return (
                <Alert variant="success">
                <Alert.Heading>¡BIENVENIDO {sessionStorage.getItem("userStation").toUpperCase()}!</Alert.Heading>
                <p>
                  Esta es la pagina de bienvenida donde encontrarás resumidas todas las acciones e información que necesites.
                  
                </p>
                <hr />
                <p className="mb-0">
                ¡Consultá la página con frecuencia para no perderte de nada!
                </p>
              </Alert>
            )
        }else{
            return null;
        }
    }

    

      
    return (
        <div>
            <NavMenu />
            <div className="container d-flex ">

                <div className="container-fluid table-scroll-vertical ">
            
                    <p>&nbsp;</p>
                    
                    
                    <div style={{ 'height': '100%'}} className="container col-10">

                    <WelcomeBanner />
                        
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">CARGA DE CONTACTOS</span>       
                        </div>
                            <div className="card-body text-center"  >
                             
                                <button className="btn btn-success m-5" onClick={navigateManual}>
                                    Cargar un contacto manualmente
                                </button>

                                <button className="btn btn-success m-5" onClick={navigateMultiple}>
                                    Carga multiple con archivos ADIF
                                </button>
                             </div>
                            
                        </div>

                       
                    </div>
                </div>
            
         </div>
         </div>
        

        );


}



