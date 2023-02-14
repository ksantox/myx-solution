import axios from "axios";
import Storage from "./storage";
import { USER_DATA } from "./constants";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    config => {
        const userData = Storage.retrieve(USER_DATA, true, {});
        const token = userData.token;

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;

// async function register(registerData) {
//     const response = await axios.post("/auth/register", registerData);
//     return response.data;
// }

// async function login(loginData) {
//     const response = await axios.post("/auth/login", loginData);
//     return response.data;
// }

// async function uploadImage(imageData) {
//     const formData = new FormData();
//     formData.append("userImage", imageData);

//     const response = await axios.post(
//         "/user/uploadImage",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     return response.data;
// }

// export {
//     login,
//     register,
//     uploadImage
// }