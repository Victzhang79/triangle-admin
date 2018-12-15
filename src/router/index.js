import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../pages/Home.vue'
import Login from '../pages/login';
import Identification from '../pages/identification';
import User from '../pages/user';
// import Coins from '../pages/coins';
// import Pawn from '../pages/pawn';
// import PawnRecord from '../pages/pawnRecords';
// import CoinRecord from '../pages/coinRecords';
// import Hold from '../pages/hold';
import Deposit from '../pages/deposit';
import Fund from '../pages/fund';
import DepositDetail from '../pages/depositDetail';
import WithdrawDetail from '../pages/withdrawDetail';

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
			path: '/user',
			name: 'User',
			component: User
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
		},
		{
			path: '/depositDetail',
			name: 'DepositDetail',
			component: DepositDetail
		},
		{
			path: '/withdrawDetail',
			name: 'WithdrawDetail',
			component: WithdrawDetail
		}
	]
});
