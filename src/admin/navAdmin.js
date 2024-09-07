import {React, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function NavAdmin(props) {
  let navigate = useNavigate();
  useEffect(() => {
    
    
    let session = sessionStorage.getItem("token");

    if (!session) {
      navigate("/admintest");
    } else {
      const jwt_Token_decoded = jwtDecode(session);

      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        return navigate("/admintest");
      }
    }
    
    // eslint-disable-next-line
  }, []
  )


    return (
        <ul class="nav justify-content-center navLu4dqAdmin">        
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/status/blabla">ESTADISTICAS</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/status/checker">VALIDADOR DE CONTACTOS</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/status/admin">ACTIVIDADES</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/status/admin/doc">DOCUMENTOS</a>
          </li>
          
        </ul>
    );
}

