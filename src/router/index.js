import Vue from 'vue';
import Router from 'vue-router';
import Accounts from '@/components/Accounts';
import MarketData from '@/components/MarketData';
import Orders from '@/components/Orders';
import Portfolio from '@/components/Portfolio';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Portfolio },
    { path: '/portfolio', component: Portfolio },
    { path: '/accounts', component: Accounts },
    { path: '/orders', component: Orders },
    { path: '/marketData', component: MarketData },
  ],
});
