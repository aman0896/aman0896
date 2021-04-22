import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

//#region get user info from cookes
export async function GetCookiesInfo() {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${window.host}/get-cookie-info`);
    console.log('response', response);
    if (response) {
        if (response.data.userInfo) {
            const data = await response.data.userInfo;
            return data;
        } else {
            return await response.data.msg;
        }
    }
}
//#endregion

//#region Get_Fabrication_Services
export function GetFabricationServices(fabricationService) {
    axios.post(`${window.host}/fabricationservice`).then((response) => {
        console.log('line-67', response);
        if (response.data) {
            fabricationService(null, response.data);
        } else {
            fabricationService('err', null);
        }
    });
}
//#endregion

//#region Get_Material_From_Fabrication_Service
export function GetMaterialFromFabrication(serviceID, materials) {
    axios
        .post(`${window.host}/materials`, {
            fabricationID: serviceID,
        })
        .then((response) => {
            if (response.data) {
                materials(null, response.data);
            } else materials('err', null);
        });
}
//#endregion
