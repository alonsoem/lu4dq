//import "./styles.css";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function Prueba() {
  const [date, setDate] = useState(new Date());
  
  console.log("DATE", date);

  return (
    <div className="App">
      <div>
        <div className="row">
          <div className="col-md-12">
            <Form.Group controlId="duedate">
              <Form.Control
                type="time"
                name="duedate"
                placeholder="Due date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
