import HOST from './DOMAIN';

const getUserListPath = HOST + 'getUserList' + '?mock_apiId=5beac6b4dfcd4447a5f6aa83';//查询用户列表
const updateUserStatusPath = HOST + 'updateUserStatus' + '?mock_apiId=5beabf58a898631f2f05ea70';//修改用户状态
const updateWithdrawStatusPath = HOST + 'updateWithdrawStatus' + '?mock_apiId=5beabe828030d9024db5d0f4';//设置允许、禁止提币状态
const opLockedCoinPath = HOST + 'opLockedCoin' + '?mock_apiId=5beab44e42073d0186f62c62';//给用户发放|锁定|解锁锁仓币

export {
	getUserListPath,
	updateUserStatusPath,
	updateWithdrawStatusPath,
	opLockedCoinPath
}