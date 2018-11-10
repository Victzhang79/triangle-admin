// const HOST = 'http://apimanage.58corp.com/';
// const HOST = 'http://10.252.55.195:8080/';
import HOST from './DOMAIN';

// const getFundPurchaseRecordListPath = HOST + '' + 'mock/5b8dde22f7c7b460838d84e5';
// const getAllFundListPath = HOST + '' + 'mock/5b99cb020178663e8b79acbb';

/* online */
const getFundPurchaseRecordListPath = HOST + 'getFundPurchaseRecordList' + '?mock_apiId=5b8dde22f7c7b460838d84e5';
const getAllFundListPath = HOST + 'getAllFundList' + '?mock_apiId=5b99cb020178663e8b79acbb';

export {
	getFundPurchaseRecordListPath,
	getAllFundListPath
}