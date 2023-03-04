import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://65wqedpzjd.execute-api.eu-west-2.amazonaws.com/api',
});

export default instance;