import {React,useEffect,useState} from 'react';
import { getResumedActivities } from './api/api';
import { useParams} from 'react-router-dom';

 const Activities =(props) => {
    
    const { idAct } = useParams(); // <-- access id match param here
    //const [signal, setSignal] = useState("");
    const [activity,setActivity] = useState([]);


    useEffect(() => {
        console.log("VA");
        console.log(idAct);

        getResumedActivities({id: idAct})       
            .then((response) => {
                    setActivity(response.confirmed);
                    console.log(response.confirmed);
            })
            .catch((response) => {
                //handleAxiosError(response)
                console.log(response);
                }
            );
        }, [idAct]
        )

        function CellDocument(values){
            console.log("DOC");
            console.log(values.info.reqStations);
            if (values.info.document){
                return <td><a href={"http://lu4dq.qrits.com.ar/api/certCreator.php?qso="+values.info.document.value+"&chk="+values.info.document.chk}>Descargar!</a></td>
            }else{
                return <td>-</td>
            }
        }

    function activityTable(){
       return (<table class="table">
       <thead>
         <tr>
           <th scope="col">Posición</th>
           <th scope="col">Indicativo</th>
           <th scope="col">Contactos</th>
           <th scope="col">Certificado</th>
           <th scope="col">Estaciones contactadas</th>
         </tr>
       </thead>
       <tbody>
       {activity.map((each) =>{
                return ( <tr>
                 <th scope="row">{ activity.indexOf(each)+1}</th>
                 <td>{each.station.toUpperCase()}</td>
                 <td>{each.callsigns.length}</td>
                 <CellDocument info={each} />
                
                 <td>

                    {each.callsigns.join(", ").toUpperCase()}
                 
                </td>
               </tr>
                )


       })}
       


       </tbody>
     </table>);
       
    }



        return(
       
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid gap-3 p-3" >
            
                    <div style={{ 'height': '100%'}} className="container col-12 m-4">

                        Esta actividad de realiza entre [FECHA] y [FECHA]. Las estaciones colaboradoras que daran contactos son: 1 ,2 ,3, 4.

                        Adicionalmente las estaciones e, b, ,d, c,d son obgligatorias para hacer un contacto y poder conseguir el certificado.
                        
                        <div className="card col-12" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        <div className="card-header">ACTIVIDAD</div>
                            <div className="card-body" >
                                {activityTable() }
                             </div>
                            
                        </div>

                    </div>
                </div>
            
           </div>
        );

    

} ;
export default Activities;