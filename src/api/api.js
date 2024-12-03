import axios from 'axios';


const foreignRequest = (type, fullPath,params,config) => axios
    .request({ url: `${fullPath}`, method: type, params:params, headers:config})
    .then(req => req.data);

const foreignPost = (fullPath, formData )=> 
    axios
        .post(fullPath, formData,{'Control-Allow-Origin':'*'})
        .then(req => req.data);


export const postOneQSO = (params) => foreignRequest('get', 'https://lu4dq.qrits.com.ar/api/uploadQSO.php',params,{'Content-Type':'Content-Type: text/html'});
export const demoCreator = (params) => foreignRequest('get', 'https://lu4dq.qrits.com.ar/api/demoCreator.php',params,{'Content-Type':'Content-Type: text/html','Control-Allow-Origin':'*'});
export const getQsl = (params) => foreignRequest('get', 'https://lu4dq.qrits.com.ar/api/qslCreator.php',params,{'Content-Type':'Content-Type: text/html','Control-Allow-Origin':'*'});
export const getResumedActivities = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/activityLog.php',params,{'Content-Type':'Content-Type: application/json'});
export const getActivities = () => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getActivities.php',null,{'Content-Type':'Content-Type: application/json'});
export const getAllActivities = () => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getAllActivities.php',null,{'Content-Type':'Content-Type: application/json'});
export const getActivity = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getActivityProperties.php',params,{'Content-Type':'Content-Type: application/json'});
export const getActivityStations = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getActivityStations.php',params,{'Content-Type':'Content-Type: application/json'});

export const postFile = (form) => foreignPost('https://lu4dq.qrits.com.ar/api/postFile.php',form);
export const getName = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getNames.php',params,{'Content-Type':'Content-Type: application/json'});
export const putName = (form) => foreignPost('https://lu4dq.qrits.com.ar/api/putName.php',form);

export const getQsoList = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getQsos.php',params,{'Content-Type':'Content-Type: application/json'});
export const getStatusRank = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getStatusRank.php',params,{'Content-Type':'Content-Type: application/json'});
export const getStatsByMode = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getStatsByMode.php',params,{'Content-Type':'Content-Type: application/json'});
export const getStatsByBand = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getStatsByBand.php',params,{'Content-Type':'Content-Type: application/json'});
export const getStatsByDate = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getStatsByDate.php',params,{'Content-Type':'Content-Type: application/json'});
export const getEnabledActivities = () => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getEnabledActivities.php',null,{'Content-Type':'Content-Type: application/json'});

export const getQsoCheck = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getQsoCheck.php',params,{'Content-Type':'Content-Type: application/json'});
export const getBand = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getBandsNew.php',params,{'Content-Type':'Content-Type: application/json'});

export const setActivity = (form) => foreignPost('https://lu4dq.qrits.com.ar/api/setActivity.php',form);
export const updateActivity = (form) => foreignPost('https://lu4dq.qrits.com.ar/api/updateActivity.php',form);
export const setStatus = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/setEnabled.php',params,{'Content-Type':'Content-Type: application/json'});

export const getDocuments = () => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getDocuments.php',null,{'Content-Type':'Content-Type: application/json'});
export const postDocument = (form) => foreignPost('https://lu4dq.qrits.com.ar/api/postDocument.php',form);
export const putDocument = (form) => foreignPost('https://lu4dq.qrits.com.ar/api/putDocument.php',form);
export const getDocumentById = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getDocumentById.php',params,{'Content-Type':'Content-Type: application/json'});

export const addNewStation = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/core/addNewStationToActivity.php',params,{'Content-Type':'Content-Type: application/json'});
export const removeStation = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/core/removeStationToActivity.php',params,{'Content-Type':'Content-Type: application/json'});

export const postStatistics = (params) => foreignRequest('get', 'https://lu4dq.qrits.com.ar/api/preQsoStatistics.php',params,{'Content-Type':'Content-Type: text/html'});

export const postLogin = (body) => foreignPost("https://lu4dq.qrits.com.ar/api/authenticate.php", body);

export const getStations = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getStationDetails.php',params,{'Content-Type':'Content-Type: application/json'});

export const addMode = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/core/addModeToActivity.php',params,{'Content-Type':'Content-Type: application/json'});
export const removeMode = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/core/removeModeFromActivity.php',params,{'Content-Type':'Content-Type: application/json'});
export const getActivityModes = (params) => foreignRequest('get','https://lu4dq.qrits.com.ar/api/getActivityModes.php',params,{'Content-Type':'Content-Type: application/json'});