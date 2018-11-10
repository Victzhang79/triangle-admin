import http from '../../util/http';
import { getPawnRecordListPath } from './maps/pawnRecords';

/** 获取典当记录列表
 * @param {string} coinCode 典当币代码,1：USDT、2：BTC、3：ETH、4：TTF、5：SEXC、6：XMX、7：PARK
 * @param {string} status 状态,1：正常，2：已平仓，3：已赎回，4：已补仓，5：需补仓
 * @param {string} startDate 典当开始日期,YYYY-MM-DD
 * @param {string} endDate 典当结束日期,YYYY-MM-DD
 * @param {number} pageNo 分页序号(非必填项，默认为1)
 * @param {number} pageSize 分页大小(非必填项，默认为10)
 */
function getPawnRecordList(coinCode, status, startDate, endDate, pageNo, pageSize) {
	return http.get(getPawnRecordListPath + '&coinCode=' + coinCode + '&status=' + status + '&startDate=' + startDate + '&endDate=' + endDate + '&pageNo=' + pageNo + '&pageSize=' + pageSize);
}

export {
	getPawnRecordList
}