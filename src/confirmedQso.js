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
        }, [idAct,activity]
        )

    function activityTable(){
       return (<table class="table">
       <thead>
         <tr>
           <th scope="col">Rank</th>
           <th scope="col">Indicativo</th>
           <th scope="col">Cantidad</th>
           <th scope="col">Estaciones contactadas</th>
         </tr>
       </thead>
       <tbody>
       {activity.map((each) =>{
                return ( <tr>
                 <th scope="row">{ activity.indexOf(each)+1}</th>
                 <td>{each.callsign.toUpperCase()}</td>
                 <td>{each.stations.length}</td>
                 <td>

                    {each.stations.join(", ").toUpperCase()}
                 
                </td>
               </tr>
                )


       })}
       


       </tbody>
     </table>);
       
    }



        return(
       
            <div className="container d-flex">

                <div className="container-fluid" >
            
                    <div style={{ 'height': '100%'}} className="container col-10 m-4">
                        
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
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