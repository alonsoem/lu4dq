import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import FormRequest from './formRequest';
import { saveAs } from 'file-saver';



import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default class Qso extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formState:false,
            qsl:null,//aca va una imagen de precarga
        };            
    }
    setQsl=(value)=>{
        this.setState({qsl:value})
        this.setState({formState:false})
        console.log("PASO POR ACA");
    }
      resetForm=()=>{
        this.setState({formState:true});
      }

       
    render() {

        const downloadImage=(url)=>{
            saveAs(url, 'qsl.jpg');
          }
       
        function PreviewPanel(props){
            return <div className="container">
                    <div class="col-md-12 text-left">
                        <h3>Encontramos las siguientes tarjetas de confirmación</h3>
                    </div>
                    
                    <div>&nbsp;</div>

                    <div class="col-md-12 text-center">
                        <img src={props.qsl} alt="Qsl" />

                   
                    </div>

                    

                    <div>&nbsp;</div>
          
                    <div class="col-md-12 text-center">
                    <button className="btn btn-success m-3" onClick={r=>
                        downloadImage(props.sql)}>
                        Descargar!
                    </button>
                    
                    
                         <button type="button" className="btn btn-danger m-3" onClick={props.showForm}>Hacer otra consulta </button>
                    </div>
                    
                    
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
