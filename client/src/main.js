import Vue from 'vue';
import { auth } from '@/firebase';
import App from './App.vue';
import router from './router';
import store from './store';

require('@/assets/main.scss');

Vue.config.productionTip = false;

auth.onAuthStateChanged((user) => {
    if (user === null) {
        // console.log('no user found');
        store.dispatch('setUser', null);
    } else {
        // console.log('user found');

        store.dispatch('setUser', {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
        });
    }
    new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount('#app');
});
