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
export const getUser = () => API.get('/user');

export const getQuestions = () => API.get(`/questions`);
export const getTopicQuestions = (id) => API.get(`/questions?topicId=${id}`);
export const getCurrentUserQuestions = (userId) => API.get(`/questions?userId=${userId}`);
export const addQuestion = (question) => API.post('/questions', question);

export const getClasses = () => API.get('/classes');
export const addClass = (newClass) => API.post('/classes', newClass);

export const getSubjects = (id="") => API.get(`/subjects?classId=${id}`);
export const addSubject = (newSubject) => API.post('/subjects', newSubject);


export const getChapters = (id="") => API.get(`/chapters?subjectId=${id}`);
export const addChapter = (newChapter) => API.post('/chapters', newChapter);

export const getTopics = (id="") => API.get(`/topics?chapterId=${id}`);
export const addTopic = (newTopic) => API.post('/topics', newTopic);