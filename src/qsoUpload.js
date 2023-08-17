import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import FormRequest from './formRequest';




import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default class QsoUpload extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formState:true,
        };            
    }
    setQsl=()=>{
                this.setState({formState:false})
        console.log("PASO POR ACA");
    }
      resetForm=()=>{
        this.setState({formState:true});
      }

       
    render() {
       
        function PreviewPanel(props){
            return <div className="container">
                        <div class="col-md-12 text-left">
                            <h3>Gracias por subir el contacto. Podras seguir la confirmacion de contactos desde el sitio de la actividad.</h3>
                        </div>
                    
                                     
                    
                         <button type="button" className="btn btn-danger m-3" onClick={props.showForm}>Hacer otra carga </button>
                    </div>
                    
        }

        function ConditionalForm(props){
            console.log(props);
            // eslint-disable-next-line
            if (props.state.formState==false){
                return <PreviewPanel qsl={props.state.qsl} showForm={props.resetForm} />;
        
            }else{
                return <FormRequest qslHook={props.setQsl}  />
                
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
