import 'react-bootstrap-typeahead/css/Typeahead.css';
import {React} from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import logo from  "./logo.png";


function NavMenu() {

  

    return (
      <div class="justify-content-center">
        <Navbar   className="p-1 navbar nav navbar-dark bg-dark navmenu navLu4dq justify-content-center" expand="sm"  >
  
          <div class="container-fluid">
          <a class="navbar-brand" href="/">
                <img src={logo} alt="" width="125" height="50" />
              </a>

            <Navbar.Toggle  aria-controls="responsive-navbar-nav"  />
           
            <Navbar.Collapse id="responsive-navbar-nav " >
   
         
              <Nav className="ms-auto">
             
                    <Nav.Link class="navlink" href="/activities">ACTIVIDADES</Nav.Link>
                  
                    <Nav.Link class="navlink" href="/">CARGA DE CONTACTOS</Nav.Link>  
                
                    <Nav.Link class="navlink" href="/qsoList">VER CONTACTOS</Nav.Link>
                    
                    <NavDropdown title="AUTOGESTIÓN" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/registrar">Registrarse</NavDropdown.Item>
                      <NavDropdown.Item href="/recupero">
                        Recuperar código
                      </NavDropdown.Item>
                      
                  </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            
          </div>

        </Navbar>
      </div>

    );
}
export default NavMenu;
