import axios from 'axios';


const foreignRequest = (type, fullPath,params,config) => axios
    .request({ url: `${fullPath}`, method: type, params:params, headers:config})
    .then(req => req.data);

export const postQSOLA = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/postQSOAL.php',params,{'Content-Type':'Content-Type: text/html','Control-Allow-Origin':'*'});
