import React from 'react';

function TimeUp(){
  return (
                  <div class="text-center m-5">
                      <div class="container object-fit-sm-contain border rounded bg-white p-5" >
                          <img src="/style/timesup.jpg" class="img-fluid " alt="NO HAY ACTIVIDADES DISPONIBLES ACTUALMENTE"/>
                          <p class="m-4 p-4 fs-3">¡NO HAY ACTIVIDADES DISPONIBLES ACTUALMENTE!</p>
                          <p class="m-1">
                              <a class="btn btn-success" href="/activities">Ver actividades</a>
                              
                          </p>
                      </div>
                      
                  </div>
  );
}
export default TimeUp;
