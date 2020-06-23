import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerapp-34a22.firebaseio.com/'
});


export default instance;