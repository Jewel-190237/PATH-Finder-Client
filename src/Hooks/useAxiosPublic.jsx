import axios from "axios";

const axiosSecurePublic = axios.create({
    baseURL: 'https://api3.pathxfinder.com/'
})
const useAxiosPublic = () => {
    return axiosSecurePublic
};

export default useAxiosPublic;