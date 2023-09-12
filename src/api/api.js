import axios from 'axios';


const foreignRequest = (type, fullPath,params,config) => axios
    .request({ url: `${fullPath}`, method: type, params:params, headers:config})
    .then(req => req.data);

const foreignPost = (fullPath, formData )=> 
    axios
        .post(fullPath, formData)
        .then(req => req.data);


export const postOneQSO = (params) => foreignRequest('get', 'http://lu4dq.qrits.com.ar/api/uploadQSO.php',params,{'Content-Type':'Content-Type: text/html'});
export const getQsl = (params) => foreignRequest('get', 'http://lu4dq.qrits.com.ar/api/qslCreator.php',params,{'Content-Type':'Content-Type: text/html','Control-Allow-Origin':'*'});
export const getResumedActivities = (params) => foreignRequest('get','http://lu4dq.qrits.com.ar/api/activityLog.php',params,{'Content-Type':'Content-Type: application/json'});
export const getActivities = () => foreignRequest('get','http://lu4dq.qrits.com.ar/api/getActivities.php',null,{'Content-Type':'Content-Type: application/json'});
export const getActivity = (params) => foreignRequest('get','http://lu4dq.qrits.com.ar/api/getActivityProperties.php',params,{'Content-Type':'Content-Type: application/json'});
export const getActivityStations = (params) => foreignRequest('get','http://lu4dq.qrits.com.ar/api/getActivityStations.php',params,{'Content-Type':'Content-Type: application/json'});

export const postFile = (form) => foreignPost('http://lu4dq.qrits.com.ar/api/postFile.php',form);
export const getName = (params) => foreignRequest('get','http://lu4dq.qrits.com.ar/api/getNames.php',params,{'Content-Type':'Content-Type: application/json'});

export const getQsoList = (params) => foreignRequest('get','http://lu4dq.qrits.com.ar/api/getQsos.php',params,{'Content-Type':'Content-Type: application/json'});
export const getStatusRank = (params) => foreignRequest('get','http://lu4dq.qrits.com.ar/api/getStatusRank.php',params,{'Content-Type':'Content-Type: application/json'});
export const getEnabledActivities = () => foreignRequest('get','http://lu4dq.qrits.com.ar/api/getEnabledActivities.php',null,{'Content-Type':'Content-Type: application/json'});
