import http from '@/../util/http';
import {
	getUserListPath,
	updateUserStatusPath,
	updateWithdrawStatusPath,
	opLockedCoinPath
} from './maps/user';

/**获取用户列表
 * @param {number} pageNo 分页序号
 * @param {number} pageSize 分页大小
 * @param {string} userMobile 用户手机号
 * @param {orderType} orderType 排序类型 取值范围：1：有效用户数，2：有效业绩，3：可提数量，4：锁仓数量
 */
function getUserList(pageNo, pageSize, userMobile, orderType) {
	let url = getUserListPath + '&pageNo=' + pageNo + '&pageSize=' + pageSize;
	if (userMobile) {
		url = url + '&userMobile=' + userMobile;
	}
	if (orderType) {
		url = url + '&orderType=' + orderType;
	}
	return http.get(url);
}

/**修改用户状态
 * @param {string} userId 用户ID
 * @param {string} userStatus 用户状态：0：停用，1：启用
 */
function updateUserStatus(userId, userStatus) {
	return http.post(updateUserStatusPath, {
		userId,
		userStatus
	});
}

/**修改提币状态
 * @param {string} userId 用户ID
 * @param {string} withdrawStatus 提币状态：0：禁止，1：允许
 */
function updateWithdrawStatus(userId, withdrawStatus) {
	http.post(updateWithdrawStatusPath, {
		userId,
		withdrawStatus
	});
}

/**给用户发放|锁定|解锁锁仓币
 * @param {string} userId 用户ID
 * @param {number} opNum 发放|锁定|解锁|数量，且大于0
 * @param {string} opType 操作类型 1：发放，2：锁定，3：解锁
 */
function opLockedCoin(userId, opNum, opType) {
	return http.post(opLockedCoinPath, {
		userId,
		opNum,
		opType
	})
}

export {
	getUserList,
	updateUserStatus,
	updateWithdrawStatus,
	opLockedCoin
}