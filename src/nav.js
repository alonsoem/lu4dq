import 'react-bootstrap-typeahead/css/Typeahead.css';
import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


//import "react-datepicker/dist/react-datepicker.css";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function NavMenu() {
    return (
      <div class="">
        <Navbar collapseOnSelect  className="p-3 navbar nav navbar-dark bg-dark navmenu navLu4dq justify-content-center" expand="sm">
          
                
            
    <Navbar.Toggle aria-controls="responsive-navbar-nav " class="navbar-toggle" />
      <Navbar.Collapse id="responsive-navbar-nav " class="navbar-toggle">
        <Nav className="nav  ms-4">
              <Nav.Link class="navlink" href="/activities">ACTIVIDADES</Nav.Link>
             
              <Nav.Link class="navlink" href="/">CARGA DE CONTACTOS</Nav.Link>  
          
              <Nav.Link class="navlink" href="/qsoList">VER CONTACTOS</Nav.Link>
        </Nav>
          </Navbar.Collapse>
    </Navbar>
      </div>

    );
}
export default NavMenu;
