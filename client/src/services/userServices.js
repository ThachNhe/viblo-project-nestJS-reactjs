import axios from '../axios';
// const userLoginService = (body) => {
//     return axios.post('/login', body);
// };
const getUsers = () => {
    return axios.get('/users');
};
export {
 
    getUsers
    // userLoginService,
};
