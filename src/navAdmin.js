import React from 'react';


export default function NavAdmin() {
    return (
        <ul class="nav justify-content-center navLu4dqAdmin">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/status/blabla">ESTADISTICAS</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/checker">VALIDADOR DE CONTACTOS</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/status/admin">ACTIVIDADES</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/status/admin/docABM">DOCUMENTOS</a>
          </li>
          
        </ul>
    );
}

