import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index';
import index1 from '@/pages/index/index1';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/index1',
      name: 'index1',
      component: index1,
    }
  ],
});
