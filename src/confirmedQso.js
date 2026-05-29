import {React,useEffect,useState} from 'react';
import { getResumedActivities ,getActivity, getActivityStations} from './api/api';
import { useParams} from 'react-router-dom';
import {Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';
import * as DOMPurify from 'dompurify';
import {Parser} from "html-to-react";
import { format } from "date-fns";
import NavMenu from './nav.js';



import { saveAs } from 'file-saver';

 const Activities =(props) => {
    
    const { idAct } = useParams(); // <-- access id match param here
    //const [signal, setSignal] = useState("");
    const [activity,setActivity] = useState([]);
    const [stations,setStations] = useState([]);
    const [properties,setProps] = useState({});
    const [show, setShow] = useState(false);
    const [loadingMatch, setLoadingMatch] = useState(false);
    

    const [filter,setFilter] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const [categoryList] = useState([]);
        const [modeList] = useState([]);
        const [valueList] = useState([]);

    const navigateToStationQso = (station) => {
        if (station){
            const myArray = station.split("/");
            navigate('/qsoList/'+myArray[0]);
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
                
                    if (response.type==="Contest"){
                        response.test.forEach(function (item, index, arr){
                            console.log(item);
                            categoryList.push(item.category);
                            modeList.push(item.mode);
                            valueList.push(item.values);
                        });     
                    }else{        
                        setActivity(response.confirmed);
                        
                    }
                    setLoadingMatch(false);
            })
            .catch((response) => {
                //handleAxiosError(response)
                console.log(response);
                setLoadingMatch(false);
                }
            );
        
    
    
        }, [idAct,valueList,categoryList,modeList]
        )

        
      
        const onChangeFilter = (event)=>{
            setFilter(event.target.value.toUpperCase());
        }

        function CellDocument(values){
            
            if (values.info.document){
                var url = "https://lu4dq.qrits.com.ar/api/certCreator.php?qso="+values.info.document.value+"&chk="+values.info.document.chk;
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
            
            if (values.info.qsl[0].document){
            
                var url = "https://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+values.info.qsl[0].document+"&chk="+values.info.qsl[0].chk;
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

        
    function activityTableByCategory(){
        
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
            
            return( 
                
                valueList.map((a,index)=>{                
                    if (a.length>0){
                        return (
                        <div class="div mt-2 ">
                            <h5 class="card-title mt-3 ms-3">
                                {categoryList[index].name==="CHECKLOG"
                                ?
                                    categoryList[index].name
                                :
                                categoryList[index].name +" en "+ modeList[index]
                                }
                            </h5>
                            <div class="card-body">
                                <PrintContestDataList data={a} />
                            </div>
                        </div>
                        );
                    }else{
                        return null;
                    }
                
                
                })
            )
       
       }
       


       
    }

     function activityTableByGroupCategory(){
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
                    <th scope="col" class="text-center d-none d-lg-table-cell">Contactos</th>
                    <th scope="col" class="text-center d-none d-sm-table-cell">Grupos/Letras</th>
                    <th scope="col" class="text-center">Certificado</th>
                    <th scope="col" class="text-center">Qsl</th>
                    
                    <th scope="col" class="text-center d-none d-lg-table-cell">Estaciones contactadas</th>
                    </tr>
                </thead>
                <tbody>
                    
                {

                        activity.filter(each=>each.station.includes(filter.toUpperCase()))
                                
                                .map((each) =>{
                    
                            return ( <tr>
                            <th scope="row" class="text-center">{ activity.indexOf(each)+1}</th>
                            <td class="text-center">
                                    {each.station.toUpperCase()}
                            </td>
                            <td class="text-center d-none d-lg-table-cell">{each.callsigns.length}</td>
                            <td class="text-center d-none d-sm-table-cell">
                                <div class="container-fluid">
                                    {each.letters.map(each=>{
                                
                                        if (each.gotIt){
                                            return <span class="letters fw-bold">{each.letter}</span>;
                                        }else{
                                            return <span class="letters ">{each.letter}</span>;
                                        }
                                
                            })}
                            </div></td>
                            
                            <td class="text-center">
                                <CellDocument info={each} />
                            </td>
                            <td class="text-center">
                                <badge class="badge text-bg-primary  text-center" role="button" title="Click para ver los comunicados y sus QSL" onClick={(r)=>navigateToStationQso(each.station)}  >
                                    Ver
                                </badge>
                            </td>
                            
                            <td class="text-center d-none d-lg-table-cell">

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

    

    const PrintContestDataList=(props)=>{
        console.log(props);
        if (props.data && props.data.length>0){
            return (
            <table class="table striped hover bordered responsive  border">
            <thead>
                <tr class="table table-primary">
                   
                    <th scope="col" class="text-center">POSICIÓN</th>
                    <th scope="col" class="text-center">ESTACIÓN</th>
                    <th scope="col" class="text-center d-none d-lg-table-cell">NOMBRE</th>
                    <th scope="col" class="text-center d-none d-lg-table-cell">PUNTOS</th>
                    <th scope="col" class="text-center">CERTIFICADO</th>
                    
                </tr>
            </thead>
            <tbody>


            {props.data.map(a=> {
                
                return (
                        <tr class="table">
                                <td  class="text-center">{a.position}</td>
                                <td  class="text-center">{a.station}</td>                               
                                <td  class="text-center d-none d-lg-table-cell">{a.name}</td>
                                <td  class="text-center d-none d-lg-table-cell">{a.points}</td>
                                <td  class="text-center"><CellDocument info={a} /></td>
                                
                            </tr>
                        
 
                )
          
                        

            }
            )}
                  </tbody>
                  </table>
                  );
            
        }else{
            return ("NO HAY NADA AQUI");
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
            return (<table class="table striped hover bordered responsive ">
                <thead>
                    <tr class="table-primary ">
                    <th scope="col" class="text-center">Posición</th>
                    <th scope="col" class="text-center">Indicativo</th>
                    <th scope="col" class="text-center d-none d-lg-table-cell ">Contactos</th>
                    <th scope="col" class="text-center">Certificado</th>
                    <th scope="col" class="text-center d-none d-lg-table-cell">Qsl</th>
                    <th scope="col" class="text-center d-none d-lg-table-cell">Estaciones contactadas</th>
                    </tr>
                </thead>
                <tbody>
                {
                    activity && activity.length===0?
                        <tr > 
                            <td class="text-center" colspan="6">
                                <div class="card p-5 mt-3">
                                <h5>NO HAY NADA POR EL MOMENTO...</h5>
                                <p>Volvé en breve para ver las actualizaciones!</p></div>
                                    
                            </td>
                        </tr>
                    :
                    activity.filter(each=>each.station.includes(filter.toUpperCase()))
                            .sort((a,b)=>b.qty-a.qty)
                            .map((each) =>{
                            
                            return ( <tr>
                            <th scope="row" class="text-center">{activity.indexOf(each)+1}</th>
                            <td class="text-center">
                                
                                    {each.station.toUpperCase()}
                                
                            </td>
                            <td class="text-center d-none d-lg-table-cell">{each.qty}</td>
                            
                            <td class="text-center">
                                <CellDocument info={each} />
                            </td>
                            <td class="text-center d-none d-lg-table-cell">
                                <badge class="badge text-bg-primary  text-center" role="button" title="Click para ver los comunicados y sus QSL" onClick={(r)=>navigateToStationQso(each.station)}  >
                                    Ver
                                </badge>
                            </td>
                            
                            <td class="text-center d-none d-lg-table-cell">

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

    

    function activityByLettersTable(){
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
                    <th scope="col" class="text-center d-none d-lg-table-cell">Contactos</th>
                    <th scope="col" class="text-center d-none d-sm-table-cell">Grupos/Letras</th>
                    <th scope="col" class="text-center">Certificado</th>
                    <th scope="col" class="text-center">Qsl</th>
                    
                    <th scope="col" class="text-center d-none d-lg-table-cell">Estaciones contactadas</th>
                    </tr>
                </thead>
                <tbody>
                    
                {

                        activity.filter(each=>each.station.includes(filter.toUpperCase()))
                                
                                .map((each) =>{
                    
                            return ( <tr>
                            <th scope="row" class="text-center">{ activity.indexOf(each)+1}</th>
                            <td class="text-center">
                                    {each.station.toUpperCase()}
                            </td>
                            <td class="text-center d-none d-lg-table-cell">{each.callsigns.length}</td>
                            <td class="text-center d-none d-sm-table-cell">
                                <div class="container-fluid">
                                    {each.letters.map(each=>{
                                
                                        if (each.gotIt){
                                            return <span class="letters fw-bold">{each.letter}</span>;
                                        }else{
                                            return <span class="letters ">{each.letter}</span>;
                                        }
                                
                            })}
                            </div></td>
                            
                            <td class="text-center">
                                <CellDocument info={each} />
                            </td>
                            <td class="text-center">
                                <badge class="badge text-bg-primary  text-center" role="button" title="Click para ver los comunicados y sus QSL" onClick={(r)=>navigateToStationQso(each.station)}  >
                                    Ver
                                </badge>
                            </td>
                            
                            <td class="text-center d-none d-lg-table-cell">

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
                    <th scope="col" class="text-center">Corresponsal</th>
                    <th scope="col" class="text-center">QSL</th>
                    <th scope="col" class="text-center d-none d-lg-table-cell">Contactos</th>
                    </tr>
                </thead>
                <tbody>
                {

            //activity.filter(each =>each.qsl[0].status =='RC Confirmed' || each.qsl[0].status =='Confirmed').sort((a,b)=>b.station>a.station).map((each) =>{                
                // eslint-disable-next-line
                activity.filter(each=>each.qsl[0].status =='RC Confirmed' && each.station.includes(filter.toUpperCase()))
                        .sort((a,b)=>b.station>a.station)
                        .map((each) =>{
                            return ( <tr>
                            <td class="text-center">{each.station.toUpperCase()}</td>
                            <td class="text-center">{each.callsign.toUpperCase()}</td>
                            
                            <td class="text-center">
                                <CellQslDocument info={each} />
                            </td>
                            <td class="text-center d-none d-lg-table-cell">
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
        saveAs("https://lu4dq.qrits.com.ar/dinamic-content/DOC/"+properties.doc, fileName);
      }

      const ModalForm=()=>{
        return (
            <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
          Muestra
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="container vw-90 vh-50 text-center" role="button">
                    <img  class="rounded img-fluid"  
                    src={"https://lu4dq.qrits.com.ar/api/demoCreator.php?id="+properties.documentId}
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
        // eslint-disable-next-line
    }else if (properties.type==1){
        return activityTable() ;
        // eslint-disable-next-line
    }else if (properties.type==2){     
        return activityByLettersTable();   
    // eslint-disable-next-line
    }else if (properties.type==3){     
        return activityTable();  
     
    }else if (properties.type===4){     
        return activityTableByCategory();   
    }else if (properties.type===5){     
        return activityTableByGroupCategory();   
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

      const getExpiredBadge = (endDate)=>{
        if (endDate){
            var endDateParts=endDate.split("-");
            var activityendDate= new Date(endDateParts[0],endDateParts[1]-1,endDateParts[2])
            if (format(activityendDate,"yyyy-MM-dd")< format(new Date(),"yyyy-MM-dd")){
                return <span class="badge bg-danger ms-2">ACTIVIDAD FINALIZADA</span>
            }
            
        }
        
        
    }

    const WorkingStations = () =>{
        
        if (properties.type===3){
            return ("¡TODAS LAS ESTACIONES PARTICIPAN!");
        }else{
            return (       
                <div>
            <p>{(properties.type===4?'Las estaciones anunciadas son:':'Las estaciones que entregan contacto son:' )}</p>
                <p class="m-2">
                    {stations.map((each)=>{
                                                    
                                                    return (
                                                            
                                                            <span class={"mb-2 me-2 badge even-larger-badge text-dark "+(each.required?"bg-warning":"")}>
                                                                {(each.letter===""?
                                                                    <b>{each.station.toUpperCase()}</b>
                                                                :
                                                                    <b>
                                                                        {each.station.toUpperCase()}
                                                                            <span class=" ms-2 badge rounded-pill bg-info text-dark">
                                                                                { each.letter}
                                                                            </span>
                                                                    </b>
                                                                )}
                                                                
                                                            </span>
                                                            );
                                                                    
                                                                
                                                    }
                                            )
                                }
                </p>
                </div>                 
            )
        }
                                    
    }
        return(
       
            
            <div>
            <NavMenu />
                
                <div className="container-fluid col-sm-12 col-12" >
            
                    <div style={{ 'height': '100%'}} className="container col-12 mt-4">

                
                        
                        <div className="card  " style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                            
                        <div className="card-header headerLu4dq">
                            <span class="display-6 ">{properties.title}</span>
                            {getExpiredBadge(properties.end)}
                            
                        </div>

                            <div class="mt-4 m-auto w-25 h-25 ">
                                
                                    <img class="rounded cursor-pointer img-fluid " 
                                        src={(properties.documentId?"https://lu4dq.qrits.com.ar/api/demoCreator.php?id="+properties.documentId:null)}
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
                                    <WorkingStations />
                                    
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
                                        <button class="btn btn-primary float-end mb-3 me-3" onClick={navView}>Ver contactos</button>
                                    </div>
                                    
                                    
                                    {// eslint-disable-next-line 
                                    properties.type==0 || properties.type==1 || properties.type==2
                                    ?
                                    <div class="container row m-0">
                                            <Form.Group className="mb-4 " controlId="signalValue">
                                                <Form.Label>BUSCAR INDICATIVO</Form.Label>
                                                <Form.Control  type="search" placeholder="Indique una señal distintiva a buscar" onChange={onChangeFilter} value={filter}
                                                                className={"form-control"} />
                                                
                                            </Form.Group>
                                        
                                    </div>
                                    :null}
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