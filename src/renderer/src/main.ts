import './assets/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import components from './components';

const app = createApp(App);
components.forEach((component) => {
    app.component(component.name as string, component);
});
app.use(store);

app.use(router);
router.push({ path: '/home' }).catch((err) => console.log(err));
app.mount('#app');
