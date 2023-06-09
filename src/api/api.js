import axios from 'axios';


const foreignRequest = (type, fullPath,params,config) => axios
    .request({ url: `${fullPath}`, method: type, params:params, headers:config})
    .then(req => req.data);

export const postQSO = (params) => foreignRequest('get', 'http://lu4dq.qrits.com.ar/api/validateQSO.php',params,{'Content-Type':'Content-Type: text/html','Control-Allow-Origin':'*'});

export const getQsl = (params) => foreignRequest('get', 'http://lu4dq.qrits.com.ar/api/qslCreator.php',params,{'Content-Type':'Content-Type: text/html','Control-Allow-Origin':'*'});
