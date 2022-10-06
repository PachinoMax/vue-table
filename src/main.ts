import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store/index';
import { VueCookieNext } from 'vue-cookie-next';

const app = createApp(App);
app.use(pinia);
app.use(VueCookieNext);
app.use(router);

app.mount('#app');
