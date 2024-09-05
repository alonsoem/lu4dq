import React from 'react';

import { useState,useEffect} from 'react';
import { getQsoList } from './api/api';
import {Form, Row} from "react-bootstrap";
import { saveAs } from 'file-saver';
import { useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';





function QsoList() {

    const {station} = useParams();
	const [ qsos, setQsos] = useState([]);
	const [ callsign, setCallSign ] = useState("");
    const [ page, setPage ] = useState(2);
    const [ hasMore, setHasMore] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();


    const navigateToStationQso = (station) => {
        if (station){
            navigate('/qsoList/'+station);
        }
    };

 
    useEffect(() => {
        console.log(station);
        if (station){
           setCallSign(station);
           loadData(station);
        }
        // eslint-disable-next-line
        }, [station]
        )

    const handleSearch =()=>{
        loadData(callsign);
    }

    const getMoreData=()=>{
        
        getQsoList({station:callsign,page:page})
        .then((response) => {
            // eslint-disable-next-line
            if (response.qsos.length>0 && response.qsos.length==100){
                setQsos(qsos.concat(response.qsos));
                setPage(page+1);
                setHasMore(true);
            
            }else if (response.qsos.length>0 && response.qsos.length<100){
                setQsos(qsos.concat(response.qsos));
                setHasMore(false);
            }else{
                setHasMore(false);
            }

            
          
      })
      .catch((response) =>null);
       
    }

    const loadData =(callId)=> {
        setHasMore(true);
        setPage(2);
        setLoading(true);
        getQsoList({station:callId,page:1})
        .then((response) => {
            if (response.qsos.length>0 && response.qsos.length==100){
                setHasMore(true);
            }else{
                setHasMore(false);
            }
            
            setQsos(response.qsos);
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }
    const handleChangeCallsign = (event) => {
        setCallSign(event.target.value);
        

    };
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
    
    const downloadImage=(url,fileName)=>{
		saveAs(url, fileName);
	}

	function qsl (qsli,qso){
        
		// eslint-disable-next-line
		if (qsli.status=="RC Confirmed"){
            
            
            const fileName=qso.station+"_"+qso.callsign+"_"+qso.date.replace(/-/gi,"")+"_"+qso.time.replace(/:/gi,"")+".jpg";
            var url ="https://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+qsli.document+"&chk="+qsli.chk;
            return (
                <p>
                <badge class="badge text-bg-warning  text-center" role="button" onClick={()=>downloadImage(url,fileName)} >
                        Descargar QSL
                </badge>
                </p>
            );

            
                
        // eslint-disable-next-line
        }else if (qsl.status=="Confirmed"){
            return ("Confirmado");
        }else{
            return ("-");
        }
    }

    function allQsl(qso){
        return  qso.qsl.map((each)=>{            
            console.log(qso.date);
            return qsl(each,qso);
        });
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
            if (qsos.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY NADA POR EL MOMENTO...</h5>
                            <p>Busca un indicativo para ver los contactos cargados!</p></div>);
            }else{
        
                return (
                    <div  >
                    <InfiniteScroll
                    dataLength={qsos.length} //This is important field to render the next data
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
                        <th scope="col" class="text-center">Indicativo</th>
                        <th scope="col" class="text-center">Fecha</th>
                        <th scope="col" class="text-center d-none d-sm-table-cell">Hora</th>
                        <th scope="col" class="text-center ">Banda</th>
                        <th scope="col" class="text-center d-none d-lg-table-cell">Modo</th>
                        <th scope="col" class="text-center d-none d-lg-table-cell ">Swl</th>
                        <th scope="col" class="text-center">Qso / Qsl</th>
                    </tr>
                </thead>
            <tbody>
           
                {qsos.map((each) =>{
                 return ( 
                    <tr>
                    <td class="text-center">
                        <badge  onClick={(r)=>navigateToStationQso(each.callsign.match(/[A-Za-z0-9]+/))}>
                            {each.swl?each.callsign+" - "+each.callsign2:each.callsign}
                        </badge>
                    </td>
                    <td class="text-center">{each.date}</td>
                    <td class="text-center d-none d-sm-table-cell">{each.time}</td>
                    <td class="text-center">{each.band}</td>
                    <td class="text-center d-none d-lg-table-cell">{each.mode}</td>
                    <td class="text-center d-none d-lg-table-cell">{each.swl?"SI":"-"}</td>
                    <td class="text-center">
                        
                        {allQsl(each)}
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
     

    return (

            <div className="container-fluid d-flex ">

                <div className="container-fluid table-scroll-vertical col-12">
                <div className="card mt-3" >
                    <div className="card-header headerLu4dq ">
                            <span class="display-6 ">CONSULTA DE CONTACTOS</span>       
                            <span class="lead fs-3 text text-break">  y descarga de QSL</span>       
                    </div>
                        <div className="card-body" >


                    <div className="card mt-3" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                        <div className="card-body" >
                            <Row className="mb-3">
                               
                                <Form.Group className="mb-3" controlId="callSignValue">
                                    <Form.Label>INDICATIVO</Form.Label>
                                    <Form.Control onChange={handleChangeCallsign}  value={callsign} type="text"
                                        className="form-control" />
                               </Form.Group>
                               
                               

                                
                            </Row>
                            <div className=" row float-end">
                                <div class="col-6 text-end">
                                    <button class="btn btn-success" onClick={handleSearch}>Buscar</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    

                    
                            <ActivityTable />
                            
                    
                    
                    
                    </div>
                    </div>

            
                </div>
            </div>

        );

    }
    export default QsoList;
