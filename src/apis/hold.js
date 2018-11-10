// 代持管理
import http from '../../util/http';
import {
	qryHolderInfoByUserMobilePath,
	opHoldPath
} from './maps/hold.js';

/**查询用户代持信息
 * @param {string} userMobile 可选。用户手机号，不填展示全部股东
 */
function qryHolderInfo(userMobile) {
	let path = qryHolderInfoByUserMobilePath;
	if (typeof userMobile === 'string') {
		path = path + '&userMobile=' + userMobile;
	}
	return http.get(path);
}

/**代持操作
 * @param {string} userId 用户ID
 * @param {string} opNum 发放|解锁|出售代持数量，且大于0
 * @param {string} opType 操作类型 1：发放代持，2：解锁代持，3：出售代持
 */
function opHold(userId, opNum, opType) {
	return http.post(opHoldPath, {
		userId,
		opNum,
		opType
	});
}

export {
	qryHolderInfo,
	opHold
}