import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../pages/Home.vue'
import Login from '../pages/login';
import Identification from '../pages/identification';
import Deposit from '../pages/deposit';
import Fund from '../pages/fund';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: Login
		},
		{
			path: '/identification',
			name: 'Identification',
			component: Identification
		},
		{
			path: '/deposit',
			name: 'Deposit',
			component: Deposit
		},
		{
			path: '/fund',
			name: 'Fund',
			component: Fund
		}
	]
});
