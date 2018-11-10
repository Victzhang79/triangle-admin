import { getFundPurchaseRecordList, getAllFundList } from '../../apis/coinRecords';

const { startDate, endDate } = (function () {
	function format(num) {
		return num > 9 ? num + '' : '0' + num;
	}
	let now, year, month, monthFormat, lastMonth, lastMonthFormat, date, dateFormat, startDate, endDate;
	now = new Date();
	year = now.getFullYear();
	month = now.getMonth() + 1;
	monthFormat = format(month);
	lastMonth = month - 1;
	lastMonthFormat = format(lastMonth);
	date = now.getDate();
	dateFormat = format(date);
	endDate = year + '-' + monthFormat + '-' + dateFormat;
	startDate = year + '-' + lastMonthFormat + '-' + dateFormat;
	return { startDate, endDate }
})();

const state = {
	crStartDate: '',//开始日期,YYYY-MM-DD
	crEndDate: '',//结束日期,YYYY-MM-DD
	crFundId: '0', //基金Id
	crPageNo: 1,//分页序号(非必填项，默认为1)
	crPageSize: 10,//分页大小(非必填项，默认为10)
	crTotalNum: 0, //记录总条数
	crFundList: [],//基金列表
	coinRecordsList: []//当前记录列表
};

const getters = {
	crStartDate: state => state.crStartDate,
	crEndDate: state => state.crEndDate,
	crFundId: state => state.crFundId,
	crPageNo: state => state.crPageNo,
	crPageSize: state => state.crPageSize,
	crTotalNum: state => state.crTotalNum,
	crFundList: state => state.crFundList,
	coinRecordsList: state => state.coinRecordsList
}

const mutations = {
	// 改变检索条件
	changeCrQueryCondition(state, params) {
		Object.assign(state, params);
		// console.log('query condition:', state);
	}
}

const actions = {
	initFundList({ state }) {
		getAllFundList().then(data => {
			if (data.code === 200) {
				state.crFundList = data.data;
			} else {
				alert('获取币生币基金列表失败');
			}
		}).catch(err => {
			alert(err);
		})
	},
	updateCoinRecordList({ state }) {
		// let params = [
		// 	state.crStartDate || startDate,
		// 	state.crEndDate || endDate,
		// 	state.crPageNo,
		// 	state.crPageSize
		// ];
		// if (state.crFundId !== -1) {
		// 	params.push(state.crFundId);
		// }
		getFundPurchaseRecordList(
			state.crStartDate || startDate,
			state.crEndDate || endDate,
			state.crPageNo,
			state.crPageSize,
			state.crFundId
		).then(data => {
			// console.log('coin record:', data);
			if (data.code === 200) {
				state.coinRecordsList = data.data;
				state.crTotalNum = data.totalNum;
			}
		}).catch(err => {
			console.log('err:', err);
		})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}