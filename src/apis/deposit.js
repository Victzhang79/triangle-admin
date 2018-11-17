import http from '../../util/http';
import DOMAIN from './maps/DOMAIN';

export default {
	// 查询定存列表
	getDepositList: params => {
		let url = DOMAIN +
			'qryDepositOverviewList?mock_apiId=5bead27741c2c429288308fc&pageNo=' +
			params.pageNo +
			'&pageSize=' +
			params.pageSize;
		if (params.startDate && params.endDate) {
			url = url +
				'&startDate=' +
				params.startDate +
				'&endDate=' +
				params.endDate;
		}
		return http.get(url);
	},
	// 查询资金流向列表
	getPerformanceList: params => {
		return http.get(
			DOMAIN +
			'qryPerformanceList?pageNo=' +
			params.pageNo +
			'&pageSize=' +
			params.pageSize +
			'&startDate=' +
			params.startDate +
			'&endDate=' +
			params.endDate +
			'&orderBy=' +
			params.orderBy +
			'&mock_apiId=5beacc78535e6d022778d6d0'
		);
	}
};
