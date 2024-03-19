import React from 'react';
import { getActivities } from './api/api.js';
import { useEffect,useState } from 'react';
import * as DOMPurify from 'dompurify';
import {Parser} from "html-to-react";
import TimeUp from './timeUp.js';




function  ActivitiesBeta () {
    
	const [ activities,setActivities] = useState([]);
    const [ loading,setLoading] = useState(true);
    
    useEffect(() => {
        
            getActivities()       
            .then((response) => {
                setActivities(response.activities);
                console.log(response.activities);
                setLoading(false);
            })
            .catch((response) => {
                //handleAxiosError(response)
                console.log(response);
                setLoading(false);
                }
            );
        
            // eslint-disable-next-line
        }, []
    )

    
        return (
                            
            <div class="container ">
                <div class="row row-cols-3 row-cols-md-3 m-4">
                    {activities && activities.map((each)=>
                    {    
                        return (
                            <div class="col mb-4">
                            <div class="card cardActivity" >
                                    <img class="card-img-top" src={(each.image?"/dinamic-content/FRT/"+each.image:"/static/defaultFrontImage.jpg")} height="130x" width="400px" alt={each.title} />
                                    <div class="card-body">
                                    <h5 class="card-title "><a class="link-underline link-underline-opacity-0 text-body" href={"/activities/"+each.id} >{each.title}</a></h5>
                                    <p class="card-text"> {Parser().parse(DOMPurify.sanitize(each.description.substring(0,300)).toString()+"...")}</p>
                                    
                                </div>
                            </div>
                            </div>

                            
                            );
                    } 
                    )}
                </div>
                {!loading && !activities?<TimeUp />:null}
            </div>

        );


    


}
export default ActivitiesBeta
