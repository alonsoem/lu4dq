import React from 'react';
import FormRequest from './formRequest';
import { saveAs } from 'file-saver';

import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default class QsoUpload extends  React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            formState:true,
            qsl:null
        };            
    }

    setQsl=(value)=>{
        console.log("OTRO");
        console.log(value);

            this.setState({qsl:value})

        this.setState({formState:false})
    }

    resetForm=()=>{
        this.setState({formState:true});
    }
    gotoActivities=()=>{
        this.setState({formState:true});
    }

    

       
    render() {
        const downloadImage=(url)=>{
            saveAs(url, 'qsl.png');
          }
          
          const downloadQsl=(qsl)=>{
            // eslint-disable-next-line
            if (qsl.status=="RC Confirmed"){
                var url = "http://lu4dq.qrits.com.ar/api/qslCreator.php?qso="+qsl.document+"&chk="+qsl.chk;
                return (
                    <h5>Este contacto fue confirmado. 

                       <button className="btn btn-success m-3" onClick={r=>
                               downloadImage(url)}>
                                   Descargar QSL!
                       </button>
                   </h5>
                );
            // eslint-disable-next-line
            }else if (qsl.status=="Confirmed"){
                return (
                    <h5>Este contacto ha sido confirmado.</h5>
                );
            
            }else{
                return "Este contacto NO ha sido confirmado aún";
            }
            
            
          }
       
        function PreviewPanel(props){
            return <div className="container">
                        <div class="col-md-12 text-left">
                            <h3>Tu contacto se cargó con éxito!</h3>

                            <h5>Podrás seguir la confirmación de contactos desde el sitio de la actividad. <a class="btn btn-success m-3" href="/activities/">Ir a las actividades</a></h5>
                        
                            {downloadQsl(props.qsl)}
                        </div>

                                         
                    
                         <button type="button" className="btn btn-primary mt-3" onClick={props.showForm}>Subir otro contacto</button>
                         
                         
                    </div>
                    
        }

        function ConditionalForm(props){

            // eslint-disable-next-line
            if (props.state.formState==false){
                return <PreviewPanel showForm={props.resetForm} qsl={props.state.qsl} showActivities={props.gotoActivities} />;
        
            }else{
                return <FormRequest qslHook={props.setQsl} />
                
            };
        }
   
      
        return (
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid table-scroll-vertical gap-3">

                <p>&nbsp;</p>
                    <div style={{ 'height': '100%'}} className="container col-10">
                        
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                            <div className="card-body" >
                             

                             <ConditionalForm state={this.state} 
                             resetForm={this.resetForm}
                             setQsl={this.setQsl}
                             
                             />
                             </div>
                            
                        </div>
                    </div>
                </div>
            
         </div>
        

        );


    }


}
