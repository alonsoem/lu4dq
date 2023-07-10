import {React,useEffect,useState} from 'react';
import { getResumedActivities } from './api/api';
import { useParams} from 'react-router-dom';


 const Activities =(props) => {
    
    const { idAct } = useParams(); // <-- access id match param here
    //const [signal, setSignal] = useState("");
    const [activity] = useState([]);



    useEffect((props) => {
        console.log("VA");
        console.log(idAct);

        getResumedActivities({id: idAct})       
            .then((response) => {
                //eslint-disable-next-line
                    this.setState({activity:response.confirmed});
                    console.log(response.confirmed);
            })
            .catch((response) => {
                //handleAxiosError(response)
                console.log(response);
                }
            );
        }
    )



   

    function activityTable(){
       return (<table class="table">
       <thead>
         <tr>
           <th scope="col">#</th>
           <th scope="col">Indicativo</th>
           <th scope="col">Estaciones contactadas</th>
         </tr>
       </thead>
       <tbody>
       {activity.map((each) =>{
                return ( <tr>
                 <th scope="row">1</th>
                 <td>{each.callsign}</td>
                 <td>{each.confirmed}</td>
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