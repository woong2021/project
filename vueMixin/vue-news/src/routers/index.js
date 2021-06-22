import Vue from 'vue';
import VueRouter from 'vue-router';
import NewsView from '../views/NewsView.vue';
import JobsView from '../views/JobsView.vue';
import AskView from '../views/AskView.vue';
import UserView from '../views/UserView.vue';
import ItemView from '../views/ItemView.vue';
import bus from '../utils/bus.js';
import { store } from '../store/index.js';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path:'/',
            redirect:'/news',
        },
        {
            path:'/news',
            name: 'news',
            component: NewsView,

            beforeEnter: (to, from, next) => {
                // console.log('to', to);
                // console.log('from', from);
                // console.log(next);

                bus.$emit('start:spinner');
                // #1
                store.dispatch('FETCH_LIST', to.name)
                .then(() => {
                    // #5
                    // console.log(5);
                    // console.log('fetched');
                    next();
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            //component: createListView('NewsView'),
        },
        {
            path:'/ask',
            name:'ask',
            component: AskView,
            //component: createListView('AskView'),
            beforeEnter: (to, from, next) => {
                bus.$emit('start:spinner');
                store.dispatch('FETCH_LIST', to.name)
                .then(() => {
                    next();
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
        {
            path:'/jobs',
            name:'jobs',
            component: JobsView,
            //component: createListView('JobsView'),
            beforeEnter: (to, from, next) => {
                bus.$emit('start:spinner');
                store.dispatch('FETCH_LIST', to.name)
                .then(() => {
                    next();
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
        {
            path:'/user/:id',
            component: UserView,
        },
        {
            path:'/item/:id',
            component: ItemView,
        }
    ]
});