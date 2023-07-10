import {React,useEffect} from 'react';
import { getResumedActivities } from './api/api';
import { useParams} from 'react-router-dom';


export default function Activities ()  {
    const { idAct } = useParams(); // <-- access id match param here
    //const [signal, setSignal] = useState("");
    //const [activity, setActivity] = useState([]);



    useEffect(() => {
        console.log("VA");
        console.log(idAct);

        getResumedActivities({id: idAct})       
            .then((response) => {
                //eslint-disable-next-line
                if (response.response=="OK"){
                    this.setState({activity:response.confirmed});
                    console.log(response.confirmed);
                }else{
                    //handleAPIError(response);
                }         
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
           <th scope="col">First</th>
           <th scope="col">Last</th>
           <th scope="col">Handle</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <th scope="row">1</th>
           <td>Mark</td>
           <td>Otto</td>
           <td>@mdo</td>
         </tr>
         <tr>
           <th scope="row">2</th>
           <td>Jacob</td>
           <td>Thornton</td>
           <td>@fat</td>
         </tr>
         <tr>
           <th scope="row">3</th>
           <td colspan="2">Larry the Bird</td>
           <td>@twitter</td>
         </tr>
       </tbody>
     </table>);
       
    }


    


        return(
       
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid table-scroll-vertical gap-3">
            
                    <p>&nbsp;</p>
                    <div style={{ 'height': '100%'}} className="container col-10">
                        
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                            <div className="card-body" >
                                {activityTable() }
                             </div>
                            
                        </div>

                    </div>
                </div>
            
           </div>
        );

    

} 