import React from 'react';


import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function NavMenu() {
    return (
        <ul class="nav justify-content-center mb-3 navLu4dq">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="/activities">ACTIVIDADES</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/">CARGA DE CONTACTOS</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/qsoList">CONSULTA DE CONTACTOS</a>
  </li>
  
</ul>
    );
}
export default NavMenu;
