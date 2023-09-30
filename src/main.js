import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/** Integration de la feuille de style personnaliser */
import './style.css';

/** Integration de fontAwesome icon */
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

/** Integration de bootsrap Js et Css */
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';



createApp(App).use(store).use(router).mount('#app')
