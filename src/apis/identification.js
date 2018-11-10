import http from '../../util/http';
import {
	qryCredentListPath,
	auditCredentPath,
	addCredentNotePath
} from './maps/identification';

/** 查询用户认证列表
 * @param {string} auditStatus 审核状态:0：未审核，1：通过，2：拒绝，不填为全部
 * @param {number} pageNo 分页序号,默认为1
 * @param {number} pageSize 分页大小,默认为10
 */
function qryCredentList(auditStatus, pageNo, pageSize) {
	let url = qryCredentListPath + '&pageNo=' + pageNo + '&pageSize=' + pageSize;
	if (auditStatus !== '-1') {
		url = url + '&auditStatus=' + auditStatus;
	}
	return http.get(url);
}

/** 审核
 * @param {string} userId 用户ID
 * @param {string} auditStatus 审核状态:1：通过，2：拒绝
 * @param {string} auditReason 审核理由，auditStatus为2时必填
 */
function auditCredent(userId, auditStatus, auditReason = '') {
	let data = {
		userId,
		auditStatus
	};
	if (auditReason) {
		data.auditReason = auditReason;
	}
	return http.post(auditCredentPath, data);
}

/** 添加备注
 * @param {string} userId 用户ID
 * @param {string} custName 客服姓名
 * @param {string} noteContent 备注
 */
function addCredentNote(userId, custName, noteContent) {
	return http.post(addCredentNotePath, {
		userId,
		custName,
		noteContent
	});
}

export {
	qryCredentList,
	auditCredent,
	addCredentNote
}