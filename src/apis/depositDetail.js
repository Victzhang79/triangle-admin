import http from '@/../util/http';
import { qryDepositDetailListPath } from './maps/depositDetail';

/**
 * 查询用户定存记录列表
 * @param {number} pageNo 分页序号
 * @param {number} pageSize 分页大小
 * @param {string} userMobile 手机号
 */
function qryDepositDetailList(pageNo, pageSize, userMobile) {
	let url = qryDepositDetailListPath + '&pageNo=' + pageNo + '&pageSize=' + pageSize;
	if (userMobile) {
		url = url + '&userMobile=' + userMobile;
	}
	return http.get(url);
}

export {
	qryDepositDetailList
}