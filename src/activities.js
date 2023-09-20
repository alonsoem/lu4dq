import React from 'react';
import { getActivities } from './api/api.js';
import { useEffect,useState } from 'react';




function  ActivitiesBeta () {
    
	const [ activities,setActivities] = useState([]);
    
    useEffect(() => {
            getActivities()       
            .then((response) => {
                setActivities(response.activities);
                    console.log(response.activities);
            })
            .catch((response) => {
                //handleAxiosError(response)
                console.log(response);
                }
            );
        
            // eslint-disable-next-line
        }, []
    )

      
        return (
                            
            <div class="container ">
                <div class="row row-cols-3 row-cols-md-3 ">
                
                    
                            {activities.map((each)=>
                            {    
                                return (
                                    <div class="col mb-4">
                                    <div class="card cardActivity" >
                                         <img class="card-img-top" src="/style/aniversario74.jpg" height="130x" width="400px" alt={each.title} />
                                         <div class="card-body">
                                            <h5 class="card-title "><a class="link-underline link-underline-opacity-0 text-body" href={"/activities/"+each.id} >{each.title}</a></h5>
                                            <p class="card-text">{each.description.substring(1,300)+"..."}</p>
                                            
                                        </div>
                                    </div>
                                    </div>

                                    
                                    );
                           } 
                            )}
                            
                            


                    
                    
                
                </div>
            </div>

        );


    


}
export default ActivitiesBeta
