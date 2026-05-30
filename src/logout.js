import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function LoginForm(props) {
    
    const navigate = useNavigate();
   
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
