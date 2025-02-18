
import React from "react";
import { useEffect } from "react";


import { postAutoLogin } from "./api/api";

import { useNavigate } from 'react-router-dom'
import Landing from "./landing";
//import "./loginform.css";
import { useLocation } from 'react-router-dom';
import QsoList from "./qsoList";


export default function LoginForm(props) {
    

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    

    useEffect(() => {
    
        sessionStorage.setItem("userLoginOK",0);
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userStation");

        const token = queryParams.get('token');
        const station = queryParams.get('station');
    
        validateToken(token,station);
        
    
        // eslint-disable-next-line
        }, []
    )

    const validateToken = (token,station) => {
        
        
	    const formData = new FormData();

        
		formData.append('userLoginOK',0);
        formData.append('userToken',token);  
        formData.append('userStation',station);  
         
    
		
    
        postAutoLogin(formData)
        .then((response) => {
            console.log(response.token);
            sessionStorage.setItem("userLoginOK", 1);
            sessionStorage.setItem("userToken", response.token);
            sessionStorage.setItem("userStation", response.station);
            navigate('/');
        })
        .catch((responseError) => handleAPIError(responseError));
    };

    const handleAPIError = (responseError) =>{
        console.log(responseError);
        let errorToDisplay = "SE PRODUJO UN ERROR INESPERADO";

        if (responseError.request && responseError.request.status === 0) {
        errorToDisplay = "COMUNICATION ERRORS";
        }
        if (responseError.response && responseError.response.status === 401) {
        errorToDisplay = "INVALID CREDENTIALS";
        }
        //setError(errorToDisplay);
        
    }

    
  
    

    return (
        <QsoList />
    );
  
}
