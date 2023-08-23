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
                            
            <div class="container-fluid">
                <div class="row">
                
                    
                            { this.state.activities.map((each)=>
                            {    
                                return (
                                    <div class="col m-3">
                                    <div className="card m-3">
                                        <div className="card-title">
                                            <a href={"/activities/"+each.id} > {each.title}</a>
                                        </div>
                                        <div className="card-body">{each.description} </div>
                                    </div>
                                    </div>
                                    );
                           } 
                            )}
                    
                
                </div>
            </div>

        );


    }


}
