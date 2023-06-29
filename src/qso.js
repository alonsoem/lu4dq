import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import FormRequest from './formRequest';



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

    setQsl=()=>{
        const value="https://media.gettyimages.com/id/1398818729/es/foto/a-group-of-extended-family-and-friends-socialising-together.jpg?s=2048x2048&w=gi&k=20&c=SXwpyXDGFKZw4JxndmPMi3AXiuj25581d-PJBQLf-AA="
        this.setState({qsl:value})
        this.setState({formState:false})
        console.log("PASO POR ACA");
    }
      resetForm=()=>{
        this.setState({formState:true,signal:"",frequency:"",datePick:"2023-01-01",time:"12:00"});
      }
       
    render() {

       
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
                            <button type="button" className="btn btn-success" onClick={props.showForm}>Hacer otra consulta </button>
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
