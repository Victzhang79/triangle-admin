import Cookie from 'js-cookie';

const state = {
	username: Cookie.get('username') || '请登录',
	userType: Cookie.get('userType') || 'admin' //admin:普通管理员，super:超级管理员
}

const getters = {
	username: state => state.username,
	userType: state => state.userType
}

const mutations = {
	chagneUserName(state, value) {
		state.username = value;
		Cookie.set('username', value);
	},
	changeUserType(state, value) {
		let type = (value === '2' ? 'super' : 'admin');
		state.userType = type;
		Cookie.set('userType', type);
	},
	logout(state) {
		Cookie.remove('adminToken');
		Cookie.remove('username');
		Cookie.remove('userType');
		state.username = '请登录';
		state.userType = 'admin'
	}
}

export default {
	state,
	getters,
	mutations
}