import {
	qryHolderInfo
} from '../../apis/hold';

const state = {
	holdInfoList: [],
	sendHoldDlgVisible: false,//发放代持
	unlockHoldDlgVisible: false,//解锁代持
	sellHoldDlgVisible: false//出售代持
};

const getters = {
	holdInfoList: state => state.holdInfoList
};

const mutations = {
	changeHoldDlgVisible(state, key, value) {
		if (key in state) {
			state[key] = value;
		}
	}
};

const actions = {
	changeHoldInfoList({ state }, { userMobile }) {
		qryHolderInfo(userMobile).then(data => {
			if (data.code === 200) {
				state.holdInfoList = data.data;
			}
		}).catch(err => {
			console.log('changeHoldInfoList error:', err);
		})
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}