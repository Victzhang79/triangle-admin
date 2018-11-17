import { qryDepositDetailList } from '@/apis/depositDetail';

const state = {
	ddMobile: 0,//手机号查询
	ddPageNo: 1,
	ddPageSize: 10,
	ddTotalNum: 0,
	depositDetailList: []
};

const getters = {
	ddPageNo: state => state.ddPageNo,
	ddPageSize: state => state.ddPageSize,
	ddTotalNum: state => state.ddTotalNum,
	depositDetailList: state => state.depositDetailList
};

const mutations = {
	changeDepositDetailQuerys(state, params) {
		Object.assign(state, params);
	}
};

const actions = {
	// 更新定存明细列表
	updateDepositDetailList({ state }) {
		qryDepositDetailList(state.ddPageNo, state.ddPageSize, state.ddMobile).then(data => {
			if (data.code === 200) {
				state.depositDetailList = data.data;
				state.ddTotalNum = data.totalNum;
			} else {
				// window.location.reload();
				state.depositDetailList = [];
				state.ddTotalNum = 0;
			}
		}).catch(() => {
			// window.location.reload();
		})
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}