import { createApp } from 'vue'
import App from './App.vue'

import hljs from 'highlight.js';

document.addEventListener('DOMContentLoaded', hljs.highlightAll);

createApp(App)
    .mount('#app')
