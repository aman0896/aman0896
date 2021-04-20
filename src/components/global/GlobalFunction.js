import axios from 'axios';
import React from 'react';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

// export default function onGetInstantBtnClick() {
//     let showModal = '';
//     //const { loggedIn } = GetCookiesInfo();
//     var cookieData = cookies.get('userInfo');
//     if (cookieData) {
//         if (cookieData.loggedIn) {
//             return (showModal = '#placeOrderModal');
//         }
//     } else {
//         window.location.href = '/login';
//     }
// }

//#region get user info from cookes
export async function GetCookiesInfo() {
    axios.defaults.withCredentials = true;
    const response = await axios.post('http://localhost:3001/get-cookie-info');
    console.log('response', response);
    if (response) {
        if (response.data.userInfo) {
            const data = await response.data.userInfo;
            return data;
        }
    }
}
//#endregion

//#region get user info from cookes old
// export function GetCookiesInfo() {
//   var cookieData = cookies.get("userInfo");
//   if (cookieData) {
//     var userStatus = cookieData.userStatus;
//     console.log(userStatus);

//     if (cookieData.userInfo) {
//       if (userStatus === "client") {
//         return {
//           userName: cookieData.userInfo[0].First_Name,
//           email: cookieData.userInfo[0].Email,
//           customerID: cookieData.userInfo[0].Customer_ID,
//           loggedIn: cookieData.loggedIn,
//           lastName: cookieData.userInfo[0].Last_Name,
//           phoneNumber: cookieData.userInfo[0].Phone_Number,
//           profileImage: cookieData.userInfo[0].Profile_Image,
//           userStatus:userStatus
//           //userStatus: cookieData.userStatus,
//         };
//       } else {

//         return {
//           userName: cookieData.userInfo[0].Company_Name,
//           email: cookieData.userInfo[0].Email,
//           manufacturerID: cookieData.userInfo[0].Manufacturer_ID,
//           loggedIn: cookieData.loggedIn,
//           CompanyName: cookieData.userInfo[0].Company_Name,
//           contactPerson: cookieData.userInfo[0].Contact_Person,
//           phoneNumber: cookieData.userInfo[0].Phone_Number,
//           Website: cookieData.userInfo[0].Website,
//           userStatus: userStatus,
//           profileImage: cookieData.userInfo[0].Logo,
//         };
//       }
//     }
//   }
// }
//#endregion

//#region Get_Fabrication_Services
export function GetFabricationServices(fabricationService) {
    axios
        .post(`http://${ipAddress}:3001/fabricationservice`)
        .then((response) => {
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
        .post(`http://${ipAddress}:3001/materials`, {
            fabricationID: serviceID,
        })
        .then((response) => {
            if (response.data) {
                materials(null, response.data);
            } else materials('err', null);
        });
}
//#endregion
