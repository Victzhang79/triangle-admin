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
	}
};
