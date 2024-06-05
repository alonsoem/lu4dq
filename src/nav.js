import 'react-bootstrap-typeahead/css/Typeahead.css';
import {React} from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Container} from 'react-bootstrap';


function NavMenu() {

  

    return (
      <div class="justify-content-center">
        <Navbar   className="p-3 navbar nav navbar-dark bg-dark navmenu navLu4dq justify-content-center" expand="sm"  >
          <Container>
            
            <Navbar.Toggle  aria-controls="responsive-navbar-nav"  />
            <Navbar.Collapse id="responsive-navbar-nav " >
              <Nav className="me-auto">
                    <Nav.Link class="navlink" href="/wp/logs/activities">ACTIVIDADES</Nav.Link>
                  
                    <Nav.Link class="navlink" href="/wp/logs/">CARGA DE CONTACTOS</Nav.Link>  
                
                    <Nav.Link class="navlink" href="/wp/logs/qsoList">VER CONTACTOS</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

    );
}
export default NavMenu;
