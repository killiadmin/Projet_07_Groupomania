import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import router from './routes/router.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; 

import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

library.add(fas);

const app = createApp(App);

app.use(BootstrapVue3);
createApp(App)
.use(router)
.component('fa', FontAwesomeIcon)
.mount('#app');