import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import store from './store';
import "@mdi/font/css/materialdesignicons.css";
axios.defaults.baseURL = 'http://localhost:8000/api/';
const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(router);
app.use(store);
app.mount('#app');
