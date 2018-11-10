import http from '../../util/http';

// const ONLINE_DOMAIN = 'http://www.aoabank.com';
// const DEV_DOMAIN = 'http://apimanage.58corp.com';
// const ONLINE_DOMAIN = 'http://10.252.55.195:8080';
// const DEV_DOMAIN = 'http://10.252.55.195:8080';

// const DOMAIN =
// 	process.env.NODE_ENV == 'production' ? ONLINE_DOMAIN : DEV_DOMAIN;
import DOMAIN from './maps/DOMAIN';

export default {
	// 获取币生币配置信息列表
	getFundInfoList: params => {
		return http.get(
			DOMAIN +
			'getFundInfoList?pageNo=' +
			params.pageNo +
			'&pageSize=' +
			params.pageSize +
			'&mock_apiId=5b9861ab43f4b33e73450522'
		);
	},

	// 保存币生币基金配置信息
	savePurchaseFund: params => {
		return http.post(
			DOMAIN + 'saveFundInfo?mock_apiId=5b8005e17411f3525322a8eb',
			params
		);
	},

	// 修改币生币基金配置信息
	updateFundInfo: params => {
		return http.post(
			DOMAIN + 'updateFundInfo?mock_apiId=5b8743c38737df7a7be54f8e',
			params
		);
	},
	// 修改币生币基金状态
	updateFundStatus: params => {
		return http.post(
			DOMAIN + 'updateFundStatus?mock_apiId=5b98fd930178663e8b79acb9',
			params
		);
	},

	// 获取典当币配置列表
	getPawnInfoList: () => {
		return http.get(
			DOMAIN + 'getPawnInfoList?mock_apiId=5b80085e7411f3525322a8ef'
		);
	},
	// 保存典当币配置信息
	savePawnInfoList: params => {
		return http.post(
			DOMAIN + 'savePawnInfoList?mock_apiId=5b800bf0b79940522920eade',
			params
		);
	},
	/** 手动调节基金认购进度
	 * @param {String} fundId 基金id
	 * @param {String} fundProgress 进度百分比（0-100）
	 * @param {String} isUse 是否使用设定的数据 0：不使用，1：使用
	 */
	setProgress: (fundId, fundProgress, isUse) => {
		return http.post(
			DOMAIN + 'updateFundProgress?mock_apiId=5bd07010c530fe018ae2070a',
			{
				fundId,
				fundProgress: (fundProgress / 100).toString(),
				isUse
			}
		);
	}
};
