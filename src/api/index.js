import axios from 'axios';

const url = "";

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})



export const logIn = (user) => API.post('/user/login', user);
export const signUp = (user) => API.post('/user/signup', user);

export const getQuestions = () => API.get('/questions');
export const getCurrentUserQuestions = (userId) => API.get(`/questions?userId=${userId}`);
export const addQuestion = (question) => API.post('/questions', question);