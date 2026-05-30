import {Form, Row,Popover, OverlayTrigger} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const popoverToken = (
    
    <Popover id="popover-positioned-right"  placement="right" >
      <Popover.Title as="h3">Código de verificación </Popover.Title>
      <Popover.Content>
          Es el <strong>código</strong> que utilizamos para validar ciertas estaciones.
          Puede que tu estación NO requiera tal validación
      </Popover.Content>
      
    </Popover>
    
  );

export default function  TokenField (params){
    if (!params.show && params.value ){
      return null;
    }
  
    return (<Row className="mb-3">
    <Form.Group className="mb-3" controlId="emailValue">
      <Form.Label>CODIGO DE VERIFICACIÓN</Form.Label>
      <span class="ms-2">
        <OverlayTrigger trigger="hover" placement="right" overlay={popoverToken}>
                 <FontAwesomeIcon  size="1x" icon={icon({name: 'circle-info'})} />
         </OverlayTrigger>
       </span>
      <Form.Control  onChange={params.handler} value={params.value} 
                     className={"form-control"}
                     />
        
  
    </Form.Group>
  </Row>)
  }