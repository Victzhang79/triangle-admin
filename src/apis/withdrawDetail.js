import http from '../../util/http';
import DOMAIN from './maps/DOMAIN';
export default {
	/**
	 * 查询用户充提记录列表
	 * @param {string} txType 交易类型{1：充值，2：提现}
	 * @param {number} pageNo 分页序号
	 * @param {number} pageSize 分页大小
	 * @param {string} userMobile 手机号
	 */
	getWithdrawList: params => {
		let url =
			DOMAIN +
			'qryUserTxDetailList?txType=' +
			params.txType +
			'&pageNo=' +
			params.pageNo +
			'&pageSize=' +
			params.pageSize +
			'&mock_apiId=5c148301166e1a0230be1ba6';
		if (params.userMobile) {
			url += '&userMobile=' + params.userMobile;
		}
		return http.get(url);
	}
};
