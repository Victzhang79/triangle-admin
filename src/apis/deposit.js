import http from '../../util/http';
import DOMAIN from './maps/DOMAIN';

export default {
	// 查询定存列表
	getDepositList: params => {
		return http.get(
			DOMAIN +
				'getFundInfoList?pageNo=' +
				params.pageNo +
				'&pageSize=' +
				params.pageSize +
				'&startDate=' +
				params.startDate +
				'&endDate=' +
				params.endDate +
				'&mock_apiId=5b9861ab43f4b33e73450522'
		);
	},
	// 查询定存列表
	getFundList: params => {
		return http.get(
			DOMAIN +
				'getFundInfoList?pageNo=' +
				params.pageNo +
				'&pageSize=' +
				params.pageSize +
				'&startDate=' +
				params.startDate +
				'&endDate=' +
				params.endDate +
				'&mock_apiId=5b9861ab43f4b33e73450522'
		);
	}
};
