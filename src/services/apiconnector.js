// import axios from 'axios';

// export const axiosInstance = axios.create({});

// export const apiConnector = async (method, url, data = {}, headers = {}, params = {}) => {
    
//     try {
//         const response = await axiosInstance({
//             method,
//             url,
//             data,
//             headers: {
//                 "Content-Type": "application/json",
//                 ...headers,
//             },
//             params,
//             withCredentials: true, 
//         });
//         console.log("Response Data:", response.data);
//         return response;
//     } catch (error) {
//         console.error("Axios Error:", error);
//         console.log("Error Response:", error.response);
//         throw error;
//     }
// };
import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}