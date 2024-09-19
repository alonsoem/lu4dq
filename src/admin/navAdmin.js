import {React, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function NavAdmin(props) {
  let navigate = useNavigate();
  useEffect(() => {
    
    
    let session = sessionStorage.getItem("token");
console.log("TOKEN");
console.log(session);
    if (!session) {
      console.log("NO HAY TOKEN");
      navigate("/login");
    } else {
      console.log("SIII HAY TOKEN");
      
      const jwt_Token_decoded = jwtDecode(session);
      console.log("JWT:"+JSON.stringify(jwt_Token_decoded));
      console.log(jwt_Token_decoded.exp);
      console.log(Date.now());
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        console.log("EXPIRO");
        navigate("/login");
      }
    }
    
    // eslint-disable-next-line
  }, []
  )


    return (
        <ul class="nav justify-content-center navLu4dqAdmin">        
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/rcpanel/stats">ESTADISTICAS</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/rcpanel/qsoChecker">VALIDADOR DE CONTACTOS</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/rcpanel">ACTIVIDADES</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/rcpanel/doc">DOCUMENTOS</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/rcpanel/stations">ESTACIONES</a>
          </li>
          
        </ul>
    );
}

