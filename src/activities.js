import React from 'react';
import ConfirmedQsos from "./confirmedQso.js";




export default class ActivitiesBeta extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };            
    }
   

       
    render() {

       
      
        return (
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid table-scroll-vertical gap-3">
                

            
                <p>&nbsp;</p>
                    <div style={{ 'height': '100%'}} className="container col-10">
                        
                        <div className="card" style={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                            <div className="card-body" >
                             

                             {//<ConfirmedQsos idAct={this.props.match.params.idAct} />
                            }
                             </div>
                            
                        </div>
                    </div>
                </div>
            
         </div>
        

        );


    }


}
