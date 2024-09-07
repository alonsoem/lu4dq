import * as md5 from "md5";
import React from "react";
import { useState,useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Image,
  Row
} from "react-bootstrap";

import { postLogin } from "../api/api";
import login_back from "../login_back.png";
import { useNavigate } from 'react-router-dom'
//import "./loginform.css";


export default function LoginForm(props) {

    const [email, setEmail] = useState("");
    const [passwordCaret, setPasswordCaret] = useState("");
    const [password, setPassword] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [error, setError] = useState("");
    // eslint-disable-next-line
    const [errors, setErrors] = useState("");

    const navigate = useNavigate();
  
    const handleChangeEmail =(event)=>{
        setEmail(event.target.value);  
    }

    const handleChangePassword =(event)=>{
        let encPwd = md5(event.target.value);
        setPassword(encPwd);  
        setPasswordCaret(event.target.value);
    }


    const showAlert = () => {
        setErrorVisible(true);
        setTimeout(() => setErrorVisible(false), 3000);
    }


    useEffect(() => {
    
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
    
        // eslint-disable-next-line
        }, []
    )

    const handleSubmit = (event) => {
        event.preventDefault();

        
	    const formData = new FormData();

		formData.append('username',email);
        formData.append('password',password);
    
    
		
    
        postLogin(formData)
        .then((response) => {
            console.log(response.token);
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("username", email);
            //props.history.push("/status/admin");
            navigate('/rcpanel');
        })
        .catch((responseError) => handleAPIError(responseError));
    };

    const handleAPIError = (responseError) =>{
        console.log(responseError);
        let errorToDisplay = "SE PRODUJO UN ERROR INESPERADO";

        if (responseError.request && responseError.request.status === 0) {
        errorToDisplay = "COMUNICATION ERRORS";
        }
        if (responseError.response && responseError.response.status === 401) {
        errorToDisplay = "INVALID CREDENTIALS";
        }
        setError(errorToDisplay);
        showAlert();
    }

    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    }

  
    

    return (
        <div className="container-fluid bg ">
        <div className="container">
            <Row className="padding-5 justify-content-center">
            <Col className="col-12 col-sm-4 col-lg-6 col-xl-6 ">
                <div className="card">
                <div className="card-body ">
                    <Form onSubmit={handleSubmit}>
                    <div className="card-header">
                        <h3 className="text-center text-black">
                        LOGIN
                        </h3>
                    </div>
                    <br />
                    <Row className="justify-content-center justify-content-sm-center justify-content-lg-center justify-content-md-center justify-content-xl-center vertical">
                        <Col className="col-6 ">
                        <Image
                            title="Accounting Light Extensible Calculator"
                            src={login_back}
                            width="100%"
                            height="100%"
                        />
                        </Col>
                    </Row>
                    <br />
                    <Alert
                        className="alert alert-dismissible"
                        variant="danger"
                        show={errorVisible}
                    >
                        {error}
                    </Alert>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>EMAIL</Form.Label>
                        <Form.Control  onChange={handleChangeEmail}  value={email} type="TEXT"
                                        className={
                                        hasError("email")
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        />
                        <div
                            className={
                                hasError("email")
                                    ? "invalid-feedback"
                                    : "visually-hidden"
                            }
                        >
                            Escribe un email válido
                        </div>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>CLAVE</Form.Label>
                        <Form.Control  onChange={handleChangePassword}  value={passwordCaret} type="password"
                                        className={
                                        hasError("password")
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        />
                        <div
                            className={
                                hasError("password")
                                    ? "invalid-feedback"
                                    : "visually-hidden"
                            }
                        >
                            Escribe una password que cumpla las directivas
                        </div>

                    </Form.Group>


            
                    <Row className="justify-content-center">
                        <Col className="justify-content-middle text-center">
                        <Button
                            variant="primary"
                            type="submit"
                            className="align-content-center"
                        >
                            ENVIAR
                        </Button>
                        </Col>
                    </Row>

                    <Row>&nbsp;</Row>

                    </Form>
                </div>
                </div>
            </Col>
            </Row>
        </div>
        </div>
    );
  
}
