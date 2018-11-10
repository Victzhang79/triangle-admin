import http from '../../util/http';
import {
	// registeAdminPath,
	// resetAdminLogPassPath,
	// modifyAdminLogPassPath,
	chkAdminLogPassPath,
	getVeriCodePath
} from './maps/admin';

/** 
 * 用户登录
 * @param {string} userMobile 登录手机号
 * @param {string} veriCode 验证码
 * @param {string} logPass 登录密码
 */
function chkAdminLogPass(userMobile, veriCode, logPass) {
	return http.post(chkAdminLogPassPath, {
		userMobile,
		veriCode,
		logPass
	});
}

/**
 * 获取短信验证码
 * @param {string} userMobile 手机号码
 */
function getVeriCode(userMobile) {
	return http.get(getVeriCodePath + '&userMobile=' + userMobile);
}

/** 注册 */

/** 重置密码 */

/** 修改密码 */

export {
	chkAdminLogPass,
	getVeriCode
}