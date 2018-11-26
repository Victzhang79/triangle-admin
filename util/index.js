export default {
	coinNameList: [
		'',
		'USDT',
		'BTC',
		'ETH',
		'TTF',
		'SEXC',
		'XMX',
		'PARK',
		'AOK'
	],
	// 判断日期是否小于今天
	compareDate: dateString => {
		let now = new Date(),
			year = now.getFullYear(),
			month = now.getMonth() + 1,
			day = now.getDate(),
			dateArr = dateString.split('-');

		if (dateArr[0] > year) {
			return false;
		} else {
			if (dateArr[1] > month) {
				return false;
			} else {
				if (dateArr[2] > day) {
					return false;
				}
				return true;
			}
		}
	},
	// trx数量展示最多保留一位小数
	trxNumberShow(num) {
		return num % 1 === 0 ? num : num.toFixed(1);
	}
};
