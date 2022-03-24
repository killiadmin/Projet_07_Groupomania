import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import router from './routes/router.js';

import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const app = createApp(App);

app.use(BootstrapVue3);
createApp(App).use(router).mount('#app');
