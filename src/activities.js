import React from 'react';
import { getActivities } from './api/api.js';




export default class ActivitiesBeta extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities:[],
        };            
    }

    componentDidMount(){
        getActivities()       
        .then((response) => {
                this.setState({activities:response.activities});
                console.log(response.activities);
        })
        .catch((response) => {
            //handleAxiosError(response)
            console.log(response);
            }
        );

    }

    
   

       
    render() {

       
      
        return (
            <div className="container d-flex gap-3 p-3">

                <div className="container-fluid table-scroll-vertical gap-3">
                
                    <div style={{ 'height': '100%'}} className="container col-10 m-4">
                        
                    <div className="card-columns">
                        { this.state.activities.map((each)=>
                           {
                            return <div className="card" style={{width: '18rem'}}>
                                <div className="card-body">
                                    <a href={"/activities/"+each.id} > {each.title}</a>
                                </div>

                            </div>
                           } 
                            )}
                            </div>
                    </div>
                </div>
            
         </div>
        

        );


    }


}
