import { getUserList } from '../../apis/user';
import util from '../../../util';

const state = {
	uMobile: 0, //手机号查询
	uOrderType: 0, //排序类型: 1：有效用户数，2：有效业绩，3：可提数量，4：锁仓数量
	uPageNo: 1,
	uPageSize: 10,
	uTotalNum: 0,
	userList: []
};

const getters = {
	uMobile: state => state.uMobile,
	uOrderType: state => state.uOrderType,
	uPageNo: state => state.uPageNo,
	uPageSize: state => state.uPageSize,
	uTotalNum: state => state.uTotalNum,
	userList: state => state.userList
};

const mutations = {
	// 改变检索条件
	changeUserQuerys(state, params) {
		Object.assign(state, params);
	}
};

const actions = {
	// 更新用户列表
	updateUserList({ state }) {
		getUserList(
			state.uPageNo,
			state.uPageSize,
			state.uMobile,
			state.uOrderType
		)
			.then(data => {
				if (data.code === 200) {
					let userList = data.data;
					for (let item of userList) {
						item.archiveTotal = util.trxNumberShow(
							item.archiveTotal
						);
						item.withdrawableNum = util.trxNumberShow(
							item.withdrawableNum
						);
						item.lockedNum = util.trxNumberShow(item.lockedNum);
						item.canReleaseNum = util.trxNumberShow(
							item.canReleaseNum
						);
					}
					state.userList = userList;
					state.uTotalNum = data.totalNum;
				} else {
					// window.location.reload();
				}
			})
			.catch(() => {
				// window.location.reload();
			});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
