import home from '../pages/pageHome.vue';
import login from '../pages/pageLogin.vue';
import profil from '../pages/pageProfil.vue';
import NotFound from '../pages/pageNotFound.vue';
import allUsers from '../pages/pageAllUsers.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: login, meta : {title : "Connexion"} },
    { path: '/home', component: home, meta : {title : "Fil d'actualité"} },
    { path: '/profil', component: profil, meta : {title : "Mon profil"}},
    { path: '/allUsers', component: allUsers ,meta: {title : "Tout les utilisateurs"}},
    { name: 'NotFound', path: '/:pathMatch(.*)', component: NotFound, meta: {title : "Error 404 NotFound!"}}
];

const router = createRouter({
    history : createWebHistory(), routes
});

router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router;