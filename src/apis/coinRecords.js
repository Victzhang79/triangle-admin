import http from '../../util/http';
import { getFundPurchaseRecordListPath, getAllFundListPath } from './maps/coinRecords';

/** 查询用户认购币生币基金记录列表
 * @param {string} startDate 典当开始日期,YYYY-MM-DD
 * @param {string} endDate 典当结束日期,YYYY-MM-DD
 * @param {number} pageNo 分页序号(非必填项，默认为1)
 * @param {number} pageSize 分页大小(非必填项，默认为10)
 */
function getFundPurchaseRecordList(startDate, endDate, pageNo, pageSize, fundId) {
	let url = getFundPurchaseRecordListPath + '&pageNo=' + pageNo + '&pageSize=' + pageSize;
	if (startDate) {
		url += '&startDate=' + startDate;
	}
	if (endDate) {
		url += '&endDate=' + endDate;
	}
	if (fundId) {
		url += '&fundId=' + fundId;
	}
	return http.get(url);
}

/** 获取全部基金id和名称列表
 * [用于后台币生币认购记录页面，查询条件：基金下拉列表]
 */
function getAllFundList() {
	return http.get(getAllFundListPath);
}

export {
	getFundPurchaseRecordList,
	getAllFundList
}