import React from 'react';

import { useState,useEffect} from 'react';
import { getAchievementsFromStation } from './api/api';
import { Row} from "react-bootstrap";
import { saveAs } from 'file-saver';

import Modal from 'react-bootstrap/Modal';


import InfiniteScroll from 'react-infinite-scroll-component';

import NavMenu from './nav';
import Feedback from './feedback';






function QsoList() {

    
	const [ goals, setGoals] = useState([]);
	const [ callsign, setCallSign ] = useState("");
    const [ page, setPage ] = useState(1);
    const [ hasMore, setHasMore] = useState(false);
    const [ loading, setLoading ] = useState(false);
    
    const [stationLogged, setStationLogged] = useState(false);
    const [loggedStation,setStation]=useState(null);

    const [show, setShow] = useState(false);

 


    
 
    
    useEffect( () =>{
        // eslint-disable-next-line
           if (sessionStorage.getItem("userLoginOK") && sessionStorage.getItem("userLoginOK")==1){
              
                setStationLogged(true);
                setStation(sessionStorage.getItem("userStation"));
                console.log("LOGGED");
            
            }else{
                setStationLogged(false);
                setStation(null);
                console.log("not LOGGED");
            }
    
    },[])

    useEffect(() => {
        
        if (loggedStation){
            console.log(loggedStation);
           setCallSign(loggedStation);
           loadData(loggedStation);
        }
        // eslint-disable-next-line
        }, [loggedStation]
        )


    const handleReport = () =>{
        handleShow();

    }
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getMoreData=()=>{
        
        getAchievementsFromStation({station:callsign,page:page})
        .then((response) => {
            setGoals(response.certificates);
            

            
          
      })
      .catch((response) =>null);
       
    }

    const loadData =(callId)=> {
        setHasMore(false);
        setPage(1);
        setLoading(true);
        getAchievementsFromStation({station:callId})
        .then((response) => {
            console.log (response);

            setGoals(response.certificates);
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }

    const handleAxiosError = (response) => {
        setLoading(false);
        //let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
        console.log("HANDLEAXIOSERROR");
        console.log(response);
            // eslint-disable-next-line
        if (response.response.data.code==1062 ) {
              //errorToDisplay = "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS.";
            }
        // eslint-disable-next-line
        if (response.message=="Network Error") {
          //errorToDisplay = "Error de red!. Reintente a la brevedad";
        }
    
        //setError(errorToDisplay);
        //notifyError(errorToDisplay);
      }
    
     function downloadCertificate(url){
            saveAs(url, 'download.jpg');
        }




    function ActivityTable(){
        
        if (loading){
                return (<div class="card p-5 mt-3">
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                        <p class="m-2"> Aguarde un instante...</p>
                    </div>
                    </div>);
        }else{
            if (goals.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY NADA POR EL MOMENTO...</h5>
                            <p>Seguí participando de las actividades para obtener certificados!</p></div>);
            }else{
                console.log(goals.length);
                return (
                    <div  >
                    <InfiniteScroll
                    dataLength={goals.length} //This is important field to render the next data
                    next={getMoreData}
                    hasMore={hasMore}
                    loader={
                        <div class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Cargando más...</span>
                            </div>
                            <p class="m-2"> Aguarde un instante...</p>
                        </div>
                        }
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>Eso es todo por ahora...</b>
                        </p>
                        
                    }
                    style={{ height: "100%", overflow:"hidden" }}
                    
                    // below props only if you need pull down functionality
                   
                    >
            <table class="table block striped hover bordered responsive mt-3 border">
                <thead>
                    <tr class="table-primary">
			            <th scope="col" class="text-center d-none d-sm-table-cell">Actividad</th>
                        <th scope="col" class="text-center">Certificado</th>
                        
                    </tr>
                </thead>
            <tbody>
           
                {goals && goals.map((each) =>{
                    var url = "https://lu4dq.qrits.com.ar/api/certCreator.php?qso="+each.document.body+"&chk="+each.document.hash;
                 return ( 
                    <tr>
			            <td class="text-center d-none d-sm-table-cell">{each.activityTitle}</td>
                   
                    <td class="text-center">
                         <badge class="badge text-bg-warning  text-center" role="button" 
                                onClick={(r)=>downloadCertificate(url)} title="Click para descargar el certificado" >
                            Descargar
                        </badge>
                    </td>
                    
                  </tr>
                 )
            
                }   )}
            

            
        
        </tbody>
      </table>
      </InfiniteScroll>
      </div>);
            }
      }
        
     }
          

      const ModalForm=()=>{
        return (
            <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            show={show} onHide={handleClose} animation={false}>
      
            <Modal.Body>
                <Feedback station={loggedStation}  close={handleClose} />
            </Modal.Body>
            
          </Modal>
          
        );
        
      }

 


    return (
        <div>
            <NavMenu />
            <ModalForm />
            
            <div className="container-fluid d-flex ">

                <div className="container-fluid table-scroll-vertical col-12">
                <div className="card mt-3" >
                    <div className="card-header headerLu4dq ">
                            <span class="display-6 ">TUS LOGROS</span>       
                            
                    </div>
                        <div className="card-body" >


                    <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                        <div className="card-body" >
                           
                               
                            <Row class="col-12">
                                 <div className=" col-6 float-start">
                                <div class="col-12  ">
                                    
                                    <span class={" link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"+(stationLogged?'':'invisible')} onClick={handleReport}  >
                                        Reportar
                                    </span>
                                </div>
                                
                            </div>  
                              
                            
                            </Row>              
                            
                        </div>
                    </div>
                    

                    
                            <ActivityTable />
                            
                    
                    
                    
                    </div>
                    </div>

            
                </div>
            </div>
            
        </div>

        );

    }
    export default QsoList;
