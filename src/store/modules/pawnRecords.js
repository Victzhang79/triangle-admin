import { getPawnRecordList } from '../../apis/pawnRecords';

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
	prCoinCode: '0',//1：USDT、2：BTC、3：ETH、4：TTF、5：SEXC、6：XMX、7：PARK、0：全部
	prStatus: '1',//1：正常，2：已平仓，3：已赎回，4：已补仓，5：需补仓
	prStartDate: '',//典当开始日期,YYYY-MM-DD
	prEndDate: '',//典当结束日期,YYYY-MM-DD
	prPageNo: 1,//分页序号(非必填项，默认为1)
	prPageSize: 10,//分页大小(非必填项，默认为10)
	prTotalNum: 0, //典当记录总条数
	pawnRecordsList: []//当前典当记录列表
};

const getters = {
	prCoinCode: state => state.prCoinCode,
	prStatus: state => state.prStatus,
	prStartDate: state => state.prStartDate,
	prEndDate: state => state.prEndDate,
	prPageNo: state => state.prPageNo,
	prPageSize: state => state.prPageSize,
	prTotalNum: state => state.prTotalNum,
	pawnRecordsList: state => state.pawnRecordsList
}

const mutations = {
	// 改变检索条件
	changeQueryCondition(state, params) {
		Object.assign(state, params);
		// console.log('query condition:', state);
	}
}

const actions = {
	updatePawnRecordList({ state }) {
		getPawnRecordList(
			state.prCoinCode,
			state.prStatus,
			state.prStartDate || startDate,
			state.prEndDate || endDate,
			state.prPageNo,
			state.prPageSize
		).then(data => {
			// console.log('pawn record:', data);
			if (data.code === 200) {
				state.pawnRecordsList = data.data;
				state.prTotalNum = data.totalNum;
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