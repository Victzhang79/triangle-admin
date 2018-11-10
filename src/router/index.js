import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../pages/Home.vue'
import Login from '../pages/login';
import Identification from '../pages/identification';
// import Coins from '../pages/coins';
// import Pawn from '../pages/pawn';
// import PawnRecord from '../pages/pawnRecords';
// import CoinRecord from '../pages/coinRecords';
// import Hold from '../pages/hold';

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
		}
		// {
		// 	path: '/pawn_record',
		// 	name: 'pawnRecord',
		// 	component: PawnRecord
		// },
		// {
		// 	path: '/coins',
		// 	name: 'Coins',
		// 	component: Coins
		// },
		// {
		// 	path: '/pawn',
		// 	name: 'Pawn',
		// 	component: Pawn
		// },
		// {
		// 	path: '/coin_record',
		// 	name: 'coinRecord',
		// 	component: CoinRecord
		// },
		// {
		// 	path: '/hold',
		// 	name: 'Hold',
		// 	component: Hold
		// }
	]
});
