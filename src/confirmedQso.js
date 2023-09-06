import {React,useEffect,useState} from 'react';
import { getResumedActivities ,getActivity, getActivityStations} from './api/api';
import { useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Modal from 'react-bootstrap/Modal';



import { saveAs } from 'file-saver';

 const Activities =(props) => {
    
    const { idAct } = useParams(); // <-- access id match param here
    //const [signal, setSignal] = useState("");
    const [activity,setActivity] = useState([]);
    const [stations,setStations] = useState([]);
    const [properties,setProps] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
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
            
            if (values.info.document){
            //    return <td><a href={"http://lu4dq.qrits.com.ar/api/certCreator.php?qso="+values.info.document.value+"&chk="+values.info.document.chk}>Descargar!</a></td>
                var url = "http://lu4dq.qrits.com.ar/api/certCreator.php?qso="+values.info.document.value+"&chk="+values.info.document.chk;
                return (
                        <badge 
                        class="badge text-bg-warning  text-center" role="button" onClick={(r)=>downloadCertificate(url)}  >
                            Descargar
                        </badge>
                    )
            }else{
                return ("-")
            }
        }

    function activityTable(){
       return (<table class="table striped hover bordered responsive border">
       <thead>
         <tr class="table-primary">
           <th scope="col" class="text-center">Posición</th>
           <th scope="col" class="text-center">Indicativo</th>
           <th scope="col" class="text-center">Contactos</th>
           <th scope="col" class="text-center">Certificado</th>
           <th scope="col" class="text-center">Estaciones contactadas</th>
         </tr>
       </thead>
       <tbody>
       {
       activity.sort((a,b)=>b.callsigns.length-a.callsigns.length).map((each) =>{
                return ( <tr>
                 <th scope="row" class="text-center">{ activity.indexOf(each)+1}</th>
                 <td class="text-center">{each.station.toUpperCase()}</td>
                 <td class="text-center">{each.callsigns.length}</td>
                 <td class="text-center">
                    <CellDocument info={each} />
                </td>
                 <td class="text-center">

                    {each.callsigns.join(" ").toUpperCase()}
                 
                </td>
               </tr>
                )


       })
       
       }
       


       </tbody>
     </table>);
       
    }

    const downloadCertificate=(url)=>{
        saveAs(url, 'CERTIFICADO 74 ANIVERSARIO RADIO CLUB QUILMES.jpg');
      }
    const downloadImage=()=>{
        saveAs("http://lu4dq.qrits.com.ar/uploads/BASES CERTIFICADO 74 ANIVERSARIO RADIO CLUB QUILMES.docx", 'BASES CERTIFICADO 74 ANIVERSARIO RADIO CLUB QUILMES.docx');
      }

      const ModalForm=()=>{
        return (
            <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div class="container vw-100 vh-50 text-center" role="button">
                    <img  width="80%" class="rounded d-block img-responsive"  
                    src="http://lu4dq.qrits.com.ar/api/DEMOCERTIFICADO.jpg" 
                    alt="Certificado de muestra" role="button"
                    />
                </div>
            </Modal.Body>
          </Modal>

          
        );
        
      }


        return(
       
            
            <div className="container d-flex gap-3 p-3 ">
                
                <div className="container-fluid gap-3 p-3" >
            
                    <div style={{ 'height': '100%'}} className="container col-12 m-4">

                
                        
                        <div className="card col-12 " style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                            
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">{properties.title}</span>
                           
                        </div>
                            <div class="m-4 lh-base float-middle ">
                                
                                    <img class="rounded mx-auto d-block cursor-pointer" 
                                    src="http://lu4dq.qrits.com.ar/api/DEMOCERTIFICADO.jpg" 
                                    height="15%" width="15%" 
                                    alt="Certificado de muestra"
                                        onClick={handleShow}
                                        />
                                
                                    <ModalForm />
                                        
                                    
                                
                            </div>
                            <div class="m-4 lh-base">
                                {properties.description}
                            </div>
                            <div class="card m-3">
                                <div className="card-header subHeader">
                                <div class="row">
                                    <div class="col-12 ">
                                        <span class="">BASES</span>
                                        <span class="float-end">
                                            <FontAwesomeIcon size="1x" icon={icon({name: 'book'})} />
                                        </span>
                                        
                                        
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
                                <div className="card-header subHeader">
                                <div class="row">
                                    <div class="col-12 ">
                                        <span class="">ESTACIONES</span>
                                        <span class="float-end">
                                            <FontAwesomeIcon size="1x" icon={icon({name: 'radio'})} />
                                        </span>
                                        
                                    </div>
                                </div>
                                </div>
                                <div className="card-body" >
                                    <p>Las estaciones que entregan contacto son: </p>
                                    <p class="m-2">
                                        {stations.map((each)=>{
                                                                        
                                                                            if (each.required){
                                                                                return (<span class="me-2"><b>{each.station.toUpperCase()}</b></span>);
                                                                            }else{
                                                                                return (<span class="me-2">{each.station.toUpperCase()}</span>);
                                                                            }
                                                                            
                                                                        
                                                                    }
                                                                )
                                        }
                                    </p>
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