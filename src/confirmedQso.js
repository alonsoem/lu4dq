import {React,useEffect,useState} from 'react';
import { getResumedActivities ,getActivity, getActivityStations} from './api/api';
import { useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';
import * as DOMPurify from 'dompurify';
import {Parser} from "html-to-react";



import { saveAs } from 'file-saver';

 const Activities =(props) => {
    
    const { idAct } = useParams(); // <-- access id match param here
    //const [signal, setSignal] = useState("");
    const [activity,setActivity] = useState([]);
    const [stations,setStations] = useState([]);
    const [properties,setProps] = useState({});
    const [show, setShow] = useState(false);
    const [loadingMatch, setLoadingMatch] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const navigateToStationQso = (station) => {
        if (station){
            navigate('/qsoList/'+station);
        }
      };


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
        
    
        setLoadingMatch(true);
        getResumedActivities({id: idAct})       
            .then((response) => {
                    console.log(response);
                    setActivity(response.confirmed);
                    setLoadingMatch(false);
            })
            .catch((response) => {
                //handleAxiosError(response)
                console.log(response);
                setLoadingMatch(false);
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
                        class="badge text-bg-warning  text-center" role="button" onClick={(r)=>downloadCertificate(url)} title="Click para descargar el certificado" >
                            Descargar
                        </badge>
                    )
            }else{
                return ("-")
            }
        }
        function CellQslDocument(values){
            
            if (values.info.qsl.document){
            
                var url = "http://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+values.info.qsl.document+"&chk="+values.info.qsl.chk;
                return (
                        <badge 
                        class="badge text-bg-warning  text-center" role="button" onClick={(r)=>downloadCertificate(url)} title="Click para descargar el certificado" >
                            Descargar
                        </badge>
                    )
            }else{
                return ("-")
            }
        }

    function activityTable(){
        if (loadingMatch){
            return (
            <div class="text-center p-5 mt-3">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="m-2"> Aguarde un instante...</p>
            </div>
            );

        }else{
            return (<table class="table striped hover bordered responsive border">
                <thead>
                    <tr class="table-primary">
                    <th scope="col" class="text-center">Posición</th>
                    <th scope="col" class="text-center">Indicativo</th>
                    <th scope="col" class="text-center">Contactos</th>
                    <th scope="col" class="text-center">Certificado</th>
                    <th scope="col" class="text-center">QSO / QSL</th>
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
                                <badge class="badge text-bg-primary  text-center" role="button" title="Click para ver los comunicados y sus QSL" onClick={(r)=>navigateToStationQso(each.station)}  >
                                        Qso/qsl
                                </badge>
                            </td>
                            <td class="text-center">

                                {each.callsigns.join(" ").toUpperCase()}
                            
                            </td>
                        </tr>
                            )
                    })
             }
            </tbody>
            </table>
            );
       
       
       
       }
       


       
    }

    function activityQslTable(){
        if (loadingMatch){
            return (
            <div class="text-center p-5 mt-3">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="m-2"> Aguarde un instante...</p>
            </div>
            );

        }else{
            return (<table class="table striped hover bordered responsive border">
                <thead>
                    <tr class="table-primary">
                    <th scope="col" class="text-center">Indicativo</th>
                    <th scope="col" class="text-center">QSL</th>
                    <th scope="col" class="text-center">Contactos</th>
                    </tr>
                </thead>
                <tbody>
                {
                    // eslint-disable-next-line
                activity.filter(each =>each.qsl.status =='RC Confirmed' || each.qsl.status ==' Confirmed').sort((a,b)=>b.station>a.station).map((each) =>{
                            return ( <tr>
                            <td class="text-center">{each.station.toUpperCase()}</td>
                            
                            <td class="text-center">
                                <CellQslDocument info={each} />
                            </td>
                            <td class="text-center">
                                <badge class="badge text-bg-primary  text-center" role="button" title="Click para ver los comunicados y sus QSL" onClick={(r)=>navigateToStationQso(each.station)}  >
                                        Ver
                                </badge>
                            </td>
    
                        </tr>
                            )
                    })
             }
            </tbody>
            </table>
            );
       
       
       
       }
       


       
    }

    function downloadCertificate(url){
        saveAs(url, properties.title+'.jpg');
    }
    
    const downloadImage=()=>{
        const docFile = properties.doc.split('.');
        const fileName=properties.title+"."+docFile[1];
        saveAs("http://lu4dq.qrits.com.ar/dinamic-content/activity"+properties.doc, fileName);
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
                <div class="container vw-90 vh-50 text-center" role="button">
                    <img  class="rounded img-fluid"  
                    src={"http://lu4dq.qrits.com.ar/api/demoCreator.php?image="+properties.image}
                    alt="Certificado de muestra" 
                    />
                </div>
            </Modal.Body>
          </Modal>

          
        );
        
      }
const showTable=()=>{
    // eslint-disable-next-line
     if (properties.type==0){
        return activityQslTable() ;
    }else{
        return activityTable() ;
    }
}
      const navLoad = () =>{
        navigate('/');    
      }
      const navView = () =>{
        navigate('/qsoList');    
      }

      const conditionalBases=()=>{
        if (properties.doc){
            return (<button class="btn btn-success float-end" onClick={r=>
                downloadImage()}>Descargar Bases</button>);
            }
      }
        return(
       
            
            <div className="container d-flex   ">
                
                <div className="container-fluid " >
            
                    <div style={{ 'height': '100%'}} className="container col-12 m-4">

                
                        
                        <div className="card col-12 " style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                            
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">{properties.title}</span>
                        </div>

                            <div class="m-4 lh-base float-middle ">
                                
                                    <img class="rounded mx-auto d-block cursor-pointer" 
                                    src={"http://lu4dq.qrits.com.ar/api/demoCreator.php?image="+properties.image}
                                    
                                    height="15%" width="15%" 
                                    alt="Certificado de muestra"
                                        onClick={handleShow}
                                        />
                                
                                    <ModalForm />
                                        
                                    
                                
                            </div>
                            
                            <div class="m-4 lh-lg" >
                                {Parser().parse(DOMPurify.sanitize(properties.description))}
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
                                <div className="card-body lh-base" >
                                    {Parser().parse(DOMPurify.sanitize(properties.tecnical))}
                                </div>

                                <div class="row p-4">
                                    <div class="col-12  display-6">
                                        {
                                           conditionalBases()
                                        }
                                        
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
                        
                            <div class="card m-3">
                                <div className="card-header subHeader">
                                    <div class="row">
                                        <div class="col-12 ">
                                            <span class="">ACTIVIDAD</span>
                                            <span class="float-end">
                                                <FontAwesomeIcon size="1x" icon={icon({name: 'ranking-star'})} />
                                            </span>                                     
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body" >
                                    <div class="container fw-bold lh-sm"></div>
                                    <div class="container lh-sm mt-2">
                                        <p>Siga los siguientes links para cargar sus contactos y verificarlos en línea. </p>
                                        <p>El siguiente listado se actualizará automáticamente mostrando los contactos y certificados de cada estación.</p>
                                    </div>
                                    <div class="container mt-2">
                                        <button class="btn btn-success float-end mb-3" onClick={navLoad}>Cargar Contactos</button>
                                        <button class="btn btn-success float-end mb-3 me-3" onClick={navView}>Ver contactos</button>
                                    </div>
                                    <div class="card col-12">

                                    
                                        {
                                          showTable()
                                        }
                                        
                                        </div>
                                    
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            
           </div>
        );

    

} ;
export default Activities;