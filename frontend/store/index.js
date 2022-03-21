// import { createStore } from 'vuex';
// import axios from 'axios'

// const instance = axios.create({
//     baseURL: 'http://localhost:5000/api/users/'
// });

// //Creation d'un nouveau store
// const store = createStore({
//     state: {
//         status: '',
//         user: {
//             userId: -1,
//             token: '',
//         },
//         userInfos : {
//             firstname:'',
//             lastname:'',
//             email: '',
//             imageUrl: '',
//         },
//     },
//     mutations: {
//         setStatus: function(state, status) {
//             state.status = status;
//         },
//         logUser: function(state, user) {
//             instance.defaults.headers.common['Authorization'] = user.token
//             state.user = user;
//         },
//         userInfos: function (state, userInfos) {
//             state.userInfos = userInfos;
//         }
//     },
//     actions: {
//         login: ({ commit }, userInfos) => {
//             commit('setStatus', 'loading');
//             return new Promise((resolve, reject) => {
//                 instance.post('/login', userInfos)
//                 .then(response => {
//                     commit('setStatus', ''); 
//                     commit('logUser', response.data);
//                     resolve(response) })
//                 .catch(err => { commit('setStatus', 'error_login');
//                 reject(err) })
//             })
//         },
//         createAccount: ({ commit }, userInfos) => {
//             commit('setStatus', 'loading');
//             return new Promise((resolve, reject) => {
//                 commit;
//                 instance.post('/signup', userInfos)
//                 .then(response => { commit('setStatus', 'create');
//                 resolve(response) })
//                 .catch(err => { commit('setStatus', 'error_create');
//                 reject(err) })
//             })
//         }, 
//         getUserInfos: ({ commit }) => {
//             instance.get('/(id)')
//             .then(function (response) {
//             commit('userInfos', response.data)   
//             })
//             .catch(err => console.log(err));
//         }
//     }
// })

// // { commit('userInfos', response.data.infos)

// export default store;