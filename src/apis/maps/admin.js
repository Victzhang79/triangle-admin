// const HOST = 'http://apimanage.58corp.com/';
// const HOST = 'http://10.252.55.195:8080/';
import HOST from './DOMAIN';

/*mock*/
// const registeAdminPath = HOST + '' + '/mock/5b7ff8c67411f3525322a8e5';//注册后台用户
// const resetAdminLogPassPath = HOST + '' + '/mock/5b8004e936ee535247192c75';//重置后台用户登录密码
// const modifyAdminLogPassPath = HOST + '' + '/mock/5b80056a7411f3525322a8e9';//修改后台用户登录密码
// const chkAdminLogPassPath = HOST + '' + '/mock/5b80046936ee535247192c73';//验证后台用户登录密码
// const getVeriCodePath = HOST + 'getVeriCode' + '?mock_apiId=5b7e5cac7ad806420cbf2bd2'; //获取短信验证码接口

/* online */
const registeAdminPath = HOST + 'registeAdmin' + '?mock_apiId=5b7ff8c67411f3525322a8e5';//注册后台用户
const resetAdminLogPassPath = HOST + 'resetAdminLogPass' + '?mock_apiId=5b8004e936ee535247192c75';//重置后台用户登录密码
const modifyAdminLogPassPath = HOST + 'modifyAdminLogPass' + '?mock_apiId=5b80056a7411f3525322a8e9';//修改后台用户登录密码
const chkAdminLogPassPath = HOST + 'chkAdminLogPass' + '?mock_apiId=5b80046936ee535247192c73';//验证后台用户登录密码
const getVeriCodePath = HOST + 'getVeriCode' + '?mock_apiId=5b7e5cac7ad806420cbf2bd2'; //获取短信验证码接口

export {
	registeAdminPath,
	resetAdminLogPassPath,
	modifyAdminLogPassPath,
	chkAdminLogPassPath,
	getVeriCodePath
}

