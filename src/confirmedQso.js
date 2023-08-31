import {React,useEffect,useState} from 'react';
import { getResumedActivities ,getActivity, getActivityStations} from './api/api';
import { useParams} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { saveAs } from 'file-saver';

 const Activities =(props) => {
    
    const { idAct } = useParams(); // <-- access id match param here
    //const [signal, setSignal] = useState("");
    const [activity,setActivity] = useState([]);
    const [stations,setStations] = useState([]);
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

        getActivityStations({id: idAct})       
        .then((response) => {
                setStations(response.stations);
        })
        .catch((response) => {
            //handleAxiosError(response)
            console.log(response);
            }
        );
        
    

        getResumedActivities({id: idAct})       
            .then((response) => {
                    setActivity(response.confirmed);
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

    const downloadImage=()=>{
        saveAs("http://lu4dq.qrits.com.ar/uploads/BASES CERTIFICADO 74 ANIVERSARIO RADIO CLUB QUILMES.docx", 'BASES CERTIFICADO 74 ANIVERSARIO RADIO CLUB QUILMES.docx');
      }



        return(
       
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid gap-3 p-3" >
            
                    <div style={{ 'height': '100%'}} className="container col-12 m-4">

                
                        
                        <div className="card col-12" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                            
                        <div className="card-header">
                            <span class="display-6">{properties.title}</span>
                           
                        </div>
                            <div class="m-4 lh-base">
                                {properties.description}
                            </div>
                            <div class="card m-3">
                                <div className="card-header">
                                <div class="row">
                                    <div class="col-12 ">
                                        <span class="">BASES</span>
                                        <span className="float-end fa fa-book" alt="BASES" title="BASES"></span>
                                    </div>
                                </div>
                                </div>
                                <div className="card-body lh-base" dangerouslySetInnerHTML={{__html: properties.tecnical}} >
                                    
                                    
                                
                                </div>

                                <div class="row p-4">
                                    <div class="col-12  display-6">
                                        <button class="btn btn-success float-end" onClick={r=>
                                            downloadImage()}>Descargar Bases</button>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="card m-3">
                                <div className="card-header">
                                <div class="row">
                                    <div class="col-12 ">
                                        <span class="">ESTACIONES</span>
                                        <span className="float-end fa fa-radio"></span>
                                    </div>
                                </div>
                                </div>
                                <div className="card-body" >
                                    <p>Las estaciones que entregan contacto son: </p>
                                    <p class="m-2">{stations.join(' ').toUpperCase()}</p>
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