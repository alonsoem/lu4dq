import React from 'react';
import { getActivities } from './api/api.js';
import { useEffect,useState } from 'react';
import * as DOMPurify from 'dompurify';
import {Parser} from "html-to-react";
import TimeUp from './timeUp.js';
import { format } from "date-fns";




function  ActivitiesBeta () {
    
	const [ activities,setActivities] = useState([]);
    const [ loading,setLoading] = useState(true);
    
    useEffect(() => {
        
            getActivities()       
            .then((response) => {
                setActivities(response.activities);
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

    const getExpiredBadge = (endDate)=>{
        if (endDate){
            var endDateParts=endDate.split("-");
            var activityendDate= new Date(endDateParts[0],endDateParts[1]-1,endDateParts[2])
            if (format(activityendDate,"yyyy-MM-dd")< format(new Date(),"yyyy-MM-dd")){
                return <span class="badge bg-danger ms-2">FINALIZADA</span>
            }
            
        }
        
        
    }

    
        return (
                            
            <div class="container-fluid ">
                <div class="mt-4 m-auto row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-3 col-xxl-10 col-12 col-xl-10 col-md-12 col-lg-8 ">
                    {activities && activities.map((each)=>
                    {    
                        return (
                            <div class="col mb-4 ">
                            <div class="card cardActivity m-auto" >
                                    <img class="card-img-top" src={(each.image?"/dinamic-content/FRT/"+each.image:"/static/defaultFrontImage.jpg")} height="130x" width="400px" alt={each.title} />
                                    <div class="card-body">
                                    <h5 class="card-title ">
                                        
                                        <a class="link-underline link-underline-opacity-0 text-body" href={"/wp/logs/activities/"+each.id} >{each.title}</a>
                                        { getExpiredBadge(each.endDate)}
                                        
                                    </h5>
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
