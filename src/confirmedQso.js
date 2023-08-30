import {React,useEffect,useState} from 'react';
import { getResumedActivities ,getActivity} from './api/api';
import { useParams} from 'react-router-dom';


 const Activities =(props) => {
    
    const { idAct } = useParams(); // <-- access id match param here
    //const [signal, setSignal] = useState("");
    const [activity,setActivity] = useState([]);
    const [properties,setProps] = useState({});


    useEffect(() => {
        console.log("VA");
        console.log(idAct);

        getActivity({id: idAct})       
        .then((response) => {
                setProps(response);
        })
        .catch((response) => {
            //handleAxiosError(response)
            console.log(response);
            }
        );
        
    

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
       return (<table class="table striped hover bordered responsive border">
       <thead>
         <tr class="table-primary">
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

                
                        
                        <div className="card col-12" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                            
                        <div className="card-header">{properties.title}</div>
                            <div class="container mt-3">
                                {properties.description}
                            </div>
                            <div class="card m-3">
                            <div className="card-header">BASES</div>
                                <div className="card-body" dangerouslySetInnerHTML={{__html: properties.tecnical}} >
                                    
                                    
                                </div>
                            </div>
                            <div class="card m-3">
                                <div className="card-header">ESTACIONES</div>
                                <div className="card-body" >
                                    1,2,3
                                </div>
                            </div>
                        
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