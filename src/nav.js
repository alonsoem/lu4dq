import 'react-bootstrap-typeahead/css/Typeahead.css';
import {React} from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import logo from  "./logo.png";


const StationMenu = (props)=> {
  const cookie=  props.session;
  // eslint-disable-next-line
  if (cookie.getItem("userLoginOK") && cookie.getItem("userLoginOK")==1){
      return (
      <NavDropdown title={cookie.getItem("userStation").toUpperCase()} id="basic-nav-dropdown">
        <NavDropdown.Item class="navlink" href="/landing">CARGA DE CONTACTOS</NavDropdown.Item>  
        <NavDropdown.Item href="/logros">Logros</NavDropdown.Item>
        
        <NavDropdown.Item href="/profile">Mi Estación</NavDropdown.Item>
        <NavDropdown.Item href="/logout">Salir</NavDropdown.Item>
      </NavDropdown>  
      );
  }else{
    return (
      
      <Nav.Link class="navlink" href="/recupero">LOGIN</Nav.Link>    
    
    );
  }
}


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
                  
                    
                
                    <Nav.Link class="navlink" href="/qsoList">VER CONTACTOS</Nav.Link>
                    

                    <StationMenu session={sessionStorage} />
                    
                    
                    <Nav.Link class="navlink" href="/ranking">RANKING</Nav.Link>
                    <Nav.Link class="navlink" href="/ayuda">AYUDA</Nav.Link>

              </Nav>
            </Navbar.Collapse>
            
          </div>

        </Navbar>
      </div>

    );
}
export default NavMenu;
