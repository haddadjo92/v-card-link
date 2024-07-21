import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/reducers/authReducer';


const axiosClient = axios.create({
    withCredentials: true    
});


let isAuthenticationUpdated = false;

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if ((error?.response?.status === 401 || error?.response?.status === 403) && !isAuthenticationUpdated) {
            isAuthenticationUpdated = true;
            // Update the isAuthenticated state to false in your Redux store
            store.dispatch(logout());
            // Reset the flag after a delay in case multiple unauthenticated requests
            setTimeout(() => {
                isAuthenticationUpdated = false;
            }, 1000);
        }
        return Promise.reject(error);
    }
);

export default axiosClient