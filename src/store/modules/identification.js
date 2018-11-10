import { qryCredentList } from '../../apis/identification';

const state = {
	auditStatus: '0', //审核状态（0：未审核，1：通过，2：拒绝, -1:全部）
	pageSize: 10,
	pageNo: 1,
	credentList: [],//认证数据列表
	totalNum: 0,//列表总数量
	refuseDialogVisible: false,// 拒绝理由弹窗展现
	noteDialogVisible: false//添加备注弹框展示
};

const getters = {
	auditStatus: state => state.auditStatus,
	pageSize: state => state.pageSize,
	credentList: state => state.credentList,
	pageNo: state => state.pageNo,
	totalNum: state => state.totalNum,
	refuseDialogVisible: state => state.refuseDialogVisible,
	noteDialogVisible: state => state.noteDialogVisible
};

const mutations = {
	// 更改审核状态查询条件
	changeAuditStatus(state, value) {
		state.auditStatus = value;
	},
	// 更改当前页码
	changePageNo(state, value) {
		state.pageNo = value;
	},
	changeRefuseDialogVisible(state, value) {
		state.refuseDialogVisible = value;
	},
	changeNoteDialogVisible(state, value) {
		state.noteDialogVisible = value;
	}
};

const actions = {
	// 更新列表数据
	updateCredentList({ state }) {
		qryCredentList(state.auditStatus, state.pageNo, state.pageSize).then(data => {
			if (data.code !== 200) {
				// console.log(data.code, ':', data.msg);
				return false;
			}
			state.credentList = data.data;
			state.totalNum = data.totalNum;
		}).catch(err => {
			console.log('err:', err);
		})
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}