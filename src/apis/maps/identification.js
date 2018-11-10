// const HOST = 'http://apimanage.58corp.com/';
// const HOST = 'http://10.252.55.195:8080/';
import HOST from './DOMAIN';

// const qryCredentListPath = HOST + '' + 'mock/5b800cbf4de25f5241d93568?a';//查询用户身份认证列表
// const auditCredentPath = HOST + '' + 'mock/5b800e5a727d49524da9096c?a';//审核用户身份认证信息
// const addCredentNotePath = HOST + '' + 'mock/5b9784d7e4341430168cec4b?a'; //客户审核用户身份认证时，添加备注用

/* online */
const qryCredentListPath = HOST + 'qryCredentList' + '?mock_apiId=5b800cbf4de25f5241d93568';//查询用户身份认证列表
const auditCredentPath = HOST + 'auditCredent' + '?mock_apiId=5b800e5a727d49524da9096c';//审核用户身份认证信息
const addCredentNotePath = HOST + 'addCredentNote' + '?mock_apiId=5b9784d7e4341430168cec4b'; //客户审核用户身份认证时，添加备注用

export {
	qryCredentListPath,
	auditCredentPath,
	addCredentNotePath
}