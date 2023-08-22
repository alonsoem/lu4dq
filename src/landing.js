import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Landing(props) {
    const navigate = useNavigate();

    const navigateManual = () => {
        navigate('/cargaManual');
      };

    const navigateMultiple = () => {
        navigate('/cargaMasiva');
    };

      
    return (
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid table-scroll-vertical gap-3">
                

            
                <p>&nbsp;</p>
                    <div style={{ 'height': '100%'}} className="container col-10">
                        
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                            <div className="card-header bg-primary text-white text-center display-5"  >Carga de contactos</div>
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
        

        );


}



