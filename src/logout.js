
import React from "react";
import { useEffect } from "react";


import { postAutoLogin } from "./api/api";

import { useNavigate } from 'react-router-dom'
import Landing from "./landing";
//import "./loginform.css";
import { useLocation } from 'react-router-dom';



export default function LoginForm(props) {
    
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    useEffect(() => {
    
        sessionStorage.setItem("userLoginOK",0);
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userStation");

        navigate('/');
        
    
        // eslint-disable-next-line
        }, []
    )

    return (
        null
    );
  
}
