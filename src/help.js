import React from 'react';


import NavMenu from './nav';












function Help() {

    return (
        <div>
            <NavMenu />
            <div className="container-fluid d-flex ">

                <div className="container-fluid table-scroll-vertical col-8">
                <div className="card mt-3" >
                    <div className="card-header headerLu4dq ">
                            <span class="display-6 ">AYUDA</span>       
                            
                            <span class="lead fs-3 text text-break">  y consultas frecuentes</span>       
                    </div>
                        <div className="card-body" >


                    <div className="card mt-3 p-5" style_bk={{'background-color': 'rgba(181,181,181,0.1)'}}>
                        
                    

                    <div class="container">
                        <div class="h1">Guía de Ayuda para la Carga de Contactos</div>
                        <p class="m-4 ">
                            <strong>LU4DQ LOG</strong> es la plataforma de gestión de actividades del <strong>Radio Club Quilmes</strong> junto a radio clubes amigos.
                            <p >Te permitirá cargar contactos para participar de distintas actividades y obtener QSLs y Certificados. </p>
                        </p> 
                        
                        
                        <p class="h2">Autenticación Sencilla</p>
                        <p class="m-4 ">A diferencia de otros sitios que requieren usuario y clave, en <strong>LU4DQ LOG</strong> todo se gestiona a través del correo electrónico.</p>
                        
                        <p class="h2">¿Cómo accedo?</p>
                        <div class="m-4 ">
                        <ol class="list-group list-group-numbered">
                            <li class="list-group-item"> Ingresá al sitio de LU4DQ LOG.</li>
                        
                            <li class="list-group-item">Dirigite al menú Autogestión &gt; Recuperar código.</li>
                        </ol>
                        </div>
                            
                        <div class="m-4 ">
                        

                        <blockquote>
                            Si nunca participaste, debés registrarte. Recordá que el correo electrónico es fundamental para completar tu registro con éxito
                            
                        </blockquote>
                        
                        

                        <ol class="list-group list-group-numbered">
                            <li class="list-group-item">Ingresá tu correo electrónico (el mismo que usaste al registrarte previamente o en otras actividades).</li>
                            <li class="list-group-item">Recibirás un mensaje desde el servicio <strong>@lu4dq.com.ar</strong> con el asunto correspondiente.</li>
                            <li class="list-group-item">En el cuerpo del correo encontrarás un botón o enlace con el texto <strong><mark style_bk="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-accent-color">'Ingresar con el código'</mark></strong>.</li>
                            <li class="list-group-item">Al hacer clic, accederás directamente al sistema para:
                                <ul class="list a">
                                    <li class="list-item">Podes cargar tus contactos en forma manual</li>
                                    <li class="list-item">Subir un archivo ADIF para carga masiva.</li>
                                </ul>

                            </li>
                        </ol>
                        </div>    


                             
                        <blockquote>
                        Podes cargar tus contactos en forma manual, o Subir un archivo ADIF para carga masiva.
                            
                        </blockquote> 
                        
                        
                        <p class="h2">Importante !</p>

                            <div class="m-4">
                            <div class="">
                                No es necesario Recuperar código si conservás tu correo: podés usar ese mismo código las veces que quieras.
                            </div>
                            
                            
                            <ul style_bk="background:linear-gradient(64deg,rgb(255,206,236) 46%,rgb(152,150,240) 100%)" class="wp-block-list has-background">
                                <li>Revisá tu carpeta de correo no deseado (<em>SPAM</em>) si no encontrás el mensaje.</li>
                            </ul>
                            </div>
                        <p class="m-4">
                            Con este sistema ágil y seguro, podés participar fácilmente de todas las actividades.
                        </p>
                        <p class="m-4">
                            Te dejamos un instructivo para que puedas descargarlo y tenerlo a mano en el momento de la carga:
                        </p>
                        <div class="m-4 center text-center ">

                                                                   
                            <a href="https://lq4d.ddns.net/wp-content/uploads/2024/03/GuiaLU4DQLOG.pdf"  target="_blank" rel="noreferrer" class="link-primary ">
                                Abrir instructivo en PDF
                            </a>
                                       
                        </div>

                        <div class="m-4 center text-center ">
                            <p>Para soporte: log@lu4dq.com.ar</p>
                        
                        </div>
                            
                        <div class="m-4 center text-center ">
                          
                            <p>Radio Club Quilmes – LU4DQ</p>
                        
                        </div>
                            


                        
                    </div>




		
                    </div>
                    

                    
                            
                            
                    
                    
                    
                    </div>
                    </div>

            
                </div>
            </div>
        </div>

        );

    }
    export default Help;
